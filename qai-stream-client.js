/**
 * Q-AI Stream Client (v3.0)
 * Official lightweight, resilient Server-Sent Events (SSE) connector for Q-Link platform.
 *
 * @license MIT
 * @copyright 2026 Q-Link Platform
 */

export class QAIStreamClient {
  /**
   * @param {Object} options
   * @param {string} [options.baseUrl] - API host (default: https://q-link-v3-0.vercel.app)
   * @param {number} [options.timeoutMs] - Request timeout in milliseconds (default: 30000)
   * @param {number} [options.maxRetries] - Max reconnect attempts on socket disconnect (default: 3)
   */
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || 'https://q-link-v3-0.vercel.app';
    this.timeoutMs = options.timeoutMs || 30000;
    this.maxRetries = options.maxRetries || 3;
    this.abortController = null;
  }

  /**
   * Dispatches a prompt to Q-AI and streams tokens incrementally.
   *
   * @param {Object} payload
   * @param {string} payload.prompt - The input user prompt.
   * @param {string} [payload.channelId] - Active channel context ID.
   * @param {Array<Object>} [payload.history] - Array of previous chat messages.
   * @param {Object} callbacks
   * @param {function(string): void} callbacks.onToken - Triggered for each incoming text chunk.
   * @param {function(string): void} [callbacks.onComplete] - Triggered when the full stream finishes.
   * @param {function(Error): void} [callbacks.onError] - Triggered if an unrecoverable failure occurs.
   * @returns {Promise<string>} Full accumulated response text.
   */
  async streamChat(payload, callbacks = {}) {
    const { onToken = () => {}, onComplete = () => {}, onError = () => {} } = callbacks;
    let accumulatedText = '';
    let retryCount = 0;

    this.abortController = new AbortController();
    const { signal } = this.abortController;

    const executeStream = async () => {
      try {
        const response = await fetch(`${this.baseUrl}/api/qai/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream'
          },
          body: JSON.stringify(payload),
          signal
        });

        if (!response.ok) {
          throw new Error(`Q-AI Gateway responded with status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith(':')) continue;

            if (trimmed.startsWith('data: ')) {
              const dataStr = trimmed.slice(6);
              if (dataStr === '[DONE]') {
                continue;
              }

              try {
                const parsed = JSON.parse(dataStr);
                const chunk = parsed.token || parsed.content || parsed.text || '';
                if (chunk) {
                  accumulatedText += chunk;
                  onToken(chunk);
                }
              } catch {
                // Fallback for raw text token streaming
                accumulatedText += dataStr;
                onToken(dataStr);
              }
            }
          }
        }

        onComplete(accumulatedText);
        return accumulatedText;
      } catch (err) {
        if (err.name === 'AbortError') {
          return accumulatedText;
        }

        if (retryCount < this.maxRetries) {
          retryCount++;
          const delay = Math.pow(2, retryCount) * 500;
          await new Promise(r => setTimeout(r, delay));
          return executeStream();
        }

        onError(err);
        throw err;
      }
    };

    return executeStream();
  }

  /**
   * Aborts the active streaming session.
   */
  abort() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }
}
