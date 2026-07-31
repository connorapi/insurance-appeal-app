// Knowledge base of denial categories with counter-arguments, rights, and required docs.
// This is what makes the generated letters actually good instead of generic.

export const denialPlaybooks = {
  medical_necessity: {
    plain_english: "Your insurer decided the treatment or service wasn't medically necessary based on their internal clinical criteria.",
    counter_arguments: [
      "Request the specific medical necessity criteria the insurer used to deny the claim — most states require insurers to disclose this on request.",
      "Attach a letter of medical necessity from the treating physician explaining the clinical rationale, including any relevant diagnosis codes and treatment history.",
      "Reference relevant clinical practice guidelines from recognized medical societies that support the treatment for this diagnosis.",
      "If conservative treatment was already tried and failed, document that history explicitly, since insurers often deny before confirming this step was completed.",
    ],
    key_rights: [
      "Right to request the insurer's specific clinical criteria used for the denial, in writing.",
      "Right to an internal appeal, typically within 180 days of the denial notice for most employer and marketplace plans.",
      "Right to an independent external review after internal appeals are exhausted, for plans regulated under the ACA.",
    ],
    documents_to_gather: [
      "Letter of medical necessity from the treating physician",
      "Relevant clinical notes and diagnostic records",
      "Documentation of any prior conservative treatments tried",
      "Copy of the original denial letter/EOB",
    ],
  },

  prior_authorization: {
    plain_english: "The insurer denied the claim because they say authorization wasn't obtained before the service was performed.",
    counter_arguments: [
      "Check whether the service actually required prior authorization under the specific plan terms — this is sometimes miscategorized.",
      "If it was an emergency or urgent situation, note that prior authorization requirements are typically waived for emergency care.",
      "If authorization was requested but not obtained in time due to insurer delay, document the timeline of the request.",
      "If the provider's office was responsible for obtaining authorization (common in-network arrangement), request the insurer hold the provider — not the patient — responsible for the lapse.",
    ],
    key_rights: [
      "Right to an internal appeal, typically within 180 days.",
      "Right to request written confirmation of the plan's specific prior authorization requirements for the service in question.",
      "Right to external review after internal appeal, for ACA-regulated plans.",
    ],
    documents_to_gather: [
      "Any records of authorization requests submitted (dates, reference numbers)",
      "Records showing whether the situation was urgent/emergency",
      "Copy of the plan's prior authorization policy, if available",
      "Copy of the original denial letter/EOB",
    ],
  },

  out_of_network: {
    plain_english: "The insurer paid less (or nothing) because the provider or facility isn't in your plan's network.",
    counter_arguments: [
      "If this was emergency care, note that the No Surprises Act generally requires insurers to cover emergency services at the in-network rate regardless of network status.",
      "If no in-network provider was reasonably available (e.g., long wait times or excessive travel distance), request a network gap exception or in-network rate.",
      "If you weren't informed the provider was out-of-network beforehand (e.g., an anesthesiologist at an in-network hospital), this may also fall under No Surprises Act protections.",
    ],
    key_rights: [
      "Right to in-network-rate billing protection for emergency services under the federal No Surprises Act (effective 2022).",
      "Right to request a network adequacy exception if no in-network provider was reasonably accessible.",
      "Right to an internal appeal, typically within 180 days.",
    ],
    documents_to_gather: [
      "Records showing the visit was an emergency, if applicable",
      "Any documentation of attempts to find an in-network provider",
      "Copy of the original denial letter/EOB",
    ],
  },

  experimental_investigational: {
    plain_english: "The insurer classified the treatment as experimental or investigational rather than an accepted, covered treatment.",
    counter_arguments: [
      "Provide evidence the treatment is FDA-approved for this specific use, if applicable.",
      "Cite peer-reviewed clinical studies or specialty society guidelines supporting the treatment as standard of care for this condition.",
      "Note if similar treatments have been approved for other patients with the same diagnosis, if known.",
    ],
    key_rights: [
      "Right to an internal appeal, typically within 180 days.",
      "Right to an independent external review specifically for experimental/investigational denials, which by law must be reviewed by clinical experts, for ACA-regulated plans.",
    ],
    documents_to_gather: [
      "FDA approval documentation for the treatment, if applicable",
      "Relevant clinical studies or guidelines supporting the treatment",
      "Letter from treating physician explaining why this treatment is appropriate and not merely experimental",
      "Copy of the original denial letter/EOB",
    ],
  },

  coding_billing_error: {
    plain_english: "The claim was denied due to a coding, billing, or administrative error rather than a coverage decision.",
    counter_arguments: [
      "Request an itemized explanation of the specific error identified by the insurer.",
      "Work with the provider's billing department to confirm and correct any coding errors, then request reprocessing.",
      "If the denial cites a duplicate claim, confirm with the provider whether it was resubmitted and request the insurer merge or correct the record.",
    ],
    key_rights: [
      "Right to request a detailed explanation of the specific billing/coding issue identified.",
      "Right to have the claim reprocessed once corrected, without needing a full appeal in many cases.",
    ],
    documents_to_gather: [
      "Itemized bill from the provider",
      "Correct CPT/ICD codes confirmed with the provider's billing department",
      "Copy of the original denial letter/EOB",
    ],
  },

  coverage_exclusion: {
    plain_english: "The insurer says this type of service or condition isn't covered under your specific plan at all.",
    counter_arguments: [
      "Request the specific plan language (Evidence of Coverage / Summary Plan Description) citing the exclusion, to confirm it applies to your exact situation.",
      "Check whether the service could be classified differently (e.g., as a covered diagnostic test rather than an excluded cosmetic procedure) in a way that avoids the exclusion.",
      "If this is a state-mandated benefit (e.g., certain mental health or maternity services), note that state law may override a plan exclusion.",
    ],
    key_rights: [
      "Right to request the specific plan document language supporting the exclusion.",
      "Right to an internal appeal, typically within 180 days.",
    ],
    documents_to_gather: [
      "Copy of your plan's Evidence of Coverage / Summary Plan Description",
      "Copy of the original denial letter/EOB",
      "Any documentation supporting an alternate classification of the service",
    ],
  },

  other: {
    plain_english: "The denial reason didn't clearly match a common category, so this appeal will need a more general approach.",
    counter_arguments: [
      "Request a full written explanation of the specific reason for denial, since general or unclear denial letters may not satisfy disclosure requirements.",
      "Ask the treating provider whether they see red flags in how the claim was coded or submitted.",
    ],
    key_rights: [
      "Right to a clear, written explanation of the specific reason for any denial.",
      "Right to an internal appeal, typically within 180 days.",
    ],
    documents_to_gather: [
      "Copy of the original denial letter/EOB",
      "Any relevant medical records or provider correspondence",
    ],
  },
};