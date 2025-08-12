import React from "react";

const Contact = () => {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 text-neutral-800 dark:text-neutral-100">
      <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
      <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-300">
        Have questions or feedback? Reach out and well get back to you.
      </p>
      <ul className="list-disc pl-5 space-y-1 text-sm">
        <li>Email: support@example.com</li>
        <li>Twitter: @example</li>
      </ul>
    </section>
  );
};

export default Contact;
