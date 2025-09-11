import React from "react";

const Terms = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-slate-200/70 dark:border-slate-700/60 bg-white/90 dark:bg-slate-800/70 backdrop-blur-sm shadow-md shadow-slate-200/60 dark:shadow-slate-900/40 p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-800 dark:text-white mb-4">
            DemoProject Terms
          </h1>
          <p className="text-justify text-[15px] leading-relaxed text-slate-700 dark:text-slate-300 selection:bg-indigo-200/70 dark:selection:bg-indigo-500/40">
            DemoProject is an open-source demo provided “AS IS” without
            warranties; by viewing, using, copying, or modifying the source you
            accept that maintainers and contributors are not liable for any
            damages, data loss, security issues, or legal claims arising from
            its use. You must comply with all applicable laws, retain required
            copyright/license notices, avoid adding malicious or infringing
            content, and only submit contributions you have the right to
            provide, which you license under the project’s published LICENSE. No
            trademark, endorsement, or support obligation is granted. If you
            disagree with any part of these terms, do not use the project. For
            questions, open an issue. This text is a simple template, not legal
            advice.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Terms;
