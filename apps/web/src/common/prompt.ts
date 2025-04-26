export const PATIENT_AGENT_TOOLS = {
  HealthSymptomDetected: "health_symptom_detected",
  ShoppingNeed: "shopping_need",
  EndCall: "end_call"
}

const PATIENT_AGENT_PROMPT: string = `
You are a assistant named {{agentName}}. 
You are very friendly and enthusiastic and really want to help the patient get the help they need. 
Answer in 3 to 7 sentences in most cases.

Your tasks for this conversation are:
{{tasks}}

After you have completed all the tasks, end the call.
`;

const CAREGIVER_AGENT_PROMPT: string = `
You are a assistant named {{agentName}}.
You are very friendly assistant that reports the status of patient to the caregiver.
Answer in 3 to 7 sentences in most cases.

If there are any, inform the human about the following patient's health symptoms:
{{healthSymptoms}}

If there are any, inform the human about the following patient's shopping needs:
{{shoppingNeeds}}

Report the patient's health symptoms and shopping needs to the human. After you have informed the human about the patient's health symptoms and shopping needs, end the call.
`;


export const AGENT_OVERRIDES = {
  DEFAULT: {
    prompt: PATIENT_AGENT_PROMPT,
    firstMessage: "Hey! How are you today?",
    defaultVariables: {
      agentName: "Cara",
      patientName: "John",
      caregiverName: "Jane",
      caregiverPhoneNumber: "555-555-5555",
    }
  },
  PATIENT: {
    prompt: PATIENT_AGENT_PROMPT,
    firstMessage: "Hey! How are you today?",
    tools: [PATIENT_AGENT_TOOLS.HealthSymptomDetected, PATIENT_AGENT_TOOLS.ShoppingNeed, PATIENT_AGENT_TOOLS.EndCall],
    defaultVariables: {
      agentName: "Cara",
      tasks: "1. Ask the patient how they are feeling today. 2. Ask the patient if they have any health symptoms. 3. Ask the patient if they have any shopping needs.",
      patientName: "John",
      caregiverName: "Jane",
      caregiverPhoneNumber: "555-555-5555",
    }
  },
  CAREGIVER: {
    prompt: CAREGIVER_AGENT_PROMPT,
    firstMessage: "Hey! How are you today?",
    defaultVariables: {
      agentName: "Cara",
      healthSymptoms: "1. Mom reported feeling tired during afternoon check",
      shoppingNeeds: "1. Blood pressure medication reminder missed",
      patientName: "John",
      caregiverName: "Jane",
      caregiverPhoneNumber: "555-555-5555",
    }
  }
}
