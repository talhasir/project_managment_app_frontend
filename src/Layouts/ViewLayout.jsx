import React from "react";

export default function PageComponent({ children, heading, addNewButtProj }) {
  return (
    <>
      <header className="bg-white shadow">
        <div className="flex justify-between items-center mx-auto max-w-[90vw] px-2 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {heading}
          </h1>
          {addNewButtProj}
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-[90vw] py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </>
  );
}
