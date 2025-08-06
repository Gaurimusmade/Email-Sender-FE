// Email validation utility
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// Validate multiple emails
export const validateEmailList = (emailString) => {
  if (!emailString.trim()) {
    return { valid: [], invalid: [], errors: ['Email list cannot be empty'] };
  }

  const emails = emailString
    .split(/[,;\n]/)
    .map(email => email.trim())
    .filter(email => email.length > 0);

  if (emails.length === 0) {
    return { valid: [], invalid: [], errors: ['No valid emails found'] };
  }

  const valid = [];
  const invalid = [];
  const errors = [];

  emails.forEach((email, index) => {
    if (validateEmail(email)) {
      if (!valid.includes(email)) {
        valid.push(email);
      }
    } else {
      invalid.push(email);
      errors.push(`Invalid email format: ${email}`);
    }
  });

  return { valid, invalid, errors };
};

// Validate prompt
export const validatePrompt = (prompt) => {
  const errors = [];
  
  if (!prompt.trim()) {
    errors.push('Prompt cannot be empty');
  } else if (prompt.trim().length < 10) {
    errors.push('Prompt must be at least 10 characters long');
  } else if (prompt.trim().length > 1000) {
    errors.push('Prompt cannot exceed 1000 characters');
  }
  
  return { isValid: errors.length === 0, errors };
};

// Validate email subject
export const validateSubject = (subject) => {
  const errors = [];
  
  if (!subject.trim()) {
    errors.push('Subject cannot be empty');
  } else if (subject.trim().length > 200) {
    errors.push('Subject cannot exceed 200 characters');
  }
  
  return { isValid: errors.length === 0, errors };
};

// Validate email body
export const validateBody = (body) => {
  const errors = [];
  
  if (!body.trim()) {
    errors.push('Email body cannot be empty');
  } else if (body.trim().length < 10) {
    errors.push('Email body must be at least 10 characters long');
  }
  
  return { isValid: errors.length === 0, errors };
};

// General form validation
export const validateForm = (data) => {
  const errors = {};
  
  // Validate prompt
  if (data.prompt !== undefined) {
    const promptValidation = validatePrompt(data.prompt);
    if (!promptValidation.isValid) {
      errors.prompt = promptValidation.errors;
    }
  }
  
  // Validate recipients
  if (data.recipients !== undefined) {
    const emailValidation = validateEmailList(data.recipients);
    if (emailValidation.errors.length > 0) {
      errors.recipients = emailValidation.errors;
    }
  }
  
  // Validate subject
  if (data.subject !== undefined) {
    const subjectValidation = validateSubject(data.subject);
    if (!subjectValidation.isValid) {
      errors.subject = subjectValidation.errors;
    }
  }
  
  // Validate body
  if (data.body !== undefined) {
    const bodyValidation = validateBody(data.body);
    if (!bodyValidation.isValid) {
      errors.body = bodyValidation.errors;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};