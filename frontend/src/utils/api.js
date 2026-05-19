/**
 * API service functions with error handling and validation
 */

const API_BASE = 'https://iqrasofts-backend.vercel.app';
const TIMEOUT = 30000; // 30 seconds

async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      signal: controller.signal,
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Submit a contact form
 */
export async function submitContact(contactData) {
  if (!contactData.name?.trim() || !contactData.email?.trim() || !contactData.message?.trim()) {
    throw new Error('Missing required fields');
  }

  const payload = {
    name: contactData.name.trim(),
    email: contactData.email.trim(),
    subject: (contactData.subject || '').trim(),
    message: contactData.message.trim(),
  };

  return apiCall('/contacts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Fetch all projects from the database
 */
export async function fetchProjects() {
  return apiCall('/projects');
}

/**
 * Fetch all published blog posts from the database
 */
export async function fetchBlogPosts() {
  return apiCall('/blog');
}

/**
 * Send a chat message to AI service
 */
export async function sendChatMessage(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('Invalid messages format');
  }

  const payload = {
    messages: messages.map((msg) => ({
      role: msg.role || 'user',
      content: msg.content || '',
    })),
  };

  return apiCall('/chat', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Check API health status
 */
export async function checkApiHealth() {
  try {
    return await apiCall('/health');
  } catch (error) {
    return { ok: false, error: error.message };
  }
}
