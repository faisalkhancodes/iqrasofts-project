/**
 * Validation utilities for forms
 */

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validateContactForm(values) {
  const errors = {};

  if (!values.name?.trim()) {
    errors.name = 'Name is required';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!values.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.message?.trim()) {
    errors.message = 'Message is required';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  if (values.subject && values.subject.trim().length > 100) {
    errors.subject = 'Subject must be less than 100 characters';
  }

  return errors;
}

export function validateChatMessage(message) {
  const trimmed = message?.trim() || '';
  
  if (!trimmed) {
    return 'Message cannot be empty';
  }
  
  if (trimmed.length > 2000) {
    return 'Message is too long (max 2000 characters)';
  }
  
  return null;
}
