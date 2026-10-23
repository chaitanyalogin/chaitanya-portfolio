// Fictional TraceCase excerpts, not candidate-completed investigation reports.
export const LINKS = Object.freeze({
  tracecase: 'https://tracecase-aml-workbench.streamlit.app/',
  tracecaseSource: 'https://github.com/chaitanyalogin/tracecase-aml-workbench',
  github: 'https://github.com/chaitanyalogin',
  linkedin: 'https://www.linkedin.com/in/chaitanyachidambarkulkarni',
});
export const CASES = Object.freeze({
  C001: Object.freeze({
    reference: 'C001 / ANITA RAO', status: 'Explanation unverified',
    headline: 'Collections for friends. What supports the story?',
    credits: '₹12,00,000', multiple: '40×',
    observe: 'Ten non-routine payers and closely following onward transfers differ from a salary-only profile.',
    verify: 'The customer’s collection explanation is unverified. Relationships to the payers and recipients are not documented.',
    consider: 'Which records would establish the purpose of the collections and the relationships between the parties?',
  }),
  C002: Object.freeze({
    reference: 'C002 / VIKRAM SHAH', status: 'Supporting records provided',
    headline: 'Similar movement. A different evidential context.',
    credits: '₹12,00,000', multiple: '30×',
    observe: 'Non-routine property sale receipts are followed by a mortgage redemption. The temporal ratio is also 95%.',
    verify: 'The fictional case contains matching property sale and mortgage verification records. Check their scope and consistency.',
    consider: 'Do those records reasonably explain the alert? Document what is supported and any remaining limitations.',
  }),
});

