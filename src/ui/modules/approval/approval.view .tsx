"use client";

import { useState } from "react";

export const ApprovalView = () => {
  const [submittedForms, setSubmittedForms] = useState<any[]>([
    {
      introduction: "Introduction du formulaire 1",
      mission_objectives: "Objectifs de la mission 1",
      planned_activities: "Activités prévues 1",
      necessary_resources: "Ressources nécessaires 1",
      conclusion: "Conclusion du formulaire 1",
      status: "en attente",
    },
    {
      introduction: "Introduction du formulaire 2",
      mission_objectives: "Objectifs de la mission 2",
      planned_activities: "Activités prévues 2",
      necessary_resources: "Ressources nécessaires 2",
      conclusion: "Conclusion du formulaire 2",
      status: "en attente",
    },
  ]);

  const approveForm = (index: number) => {
    const updatedForms = [...submittedForms];
    updatedForms[index].status = "approuvé";
    setSubmittedForms(updatedForms);
  };

  const rejectForm = (index: number) => {
    const updatedForms = [...submittedForms];
    updatedForms[index].status = "rejeté";
    setSubmittedForms(updatedForms);
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mt-10">Formulaires soumis</h2>
      <div className="mt-4 space-y-4">
        {submittedForms.length === 0 ? (
          <p>Aucun formulaire soumis.</p>
        ) : (
          submittedForms.map((form, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded">
              <div>
                <p>
                  <strong>Introduction :</strong> {form.introduction}
                </p>
                <p>
                  <strong>Objectifs de la mission :</strong>{" "}
                  {form.mission_objectives}
                </p>
                <p>
                  <strong>Activités prévues :</strong> {form.planned_activities}
                </p>
                <p>
                  <strong>Ressources nécessaires :</strong>{" "}
                  {form.necessary_resources}
                </p>
                <p>
                  <strong>Conclusion :</strong> {form.conclusion}
                </p>
              </div>
              {form.status === "en attente" && (
                <div className="space-x-2 mt-4">
                  <button
                    onClick={() => approveForm(index)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Approuver
                  </button>
                  <button
                    onClick={() => rejectForm(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Rejeter
                  </button>
                </div>
              )}
              <p
                className={`mt-2 font-bold ${
                  form.status === "approuvé"
                    ? "text-green-600"
                    : form.status === "rejeté"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                Statut : {form.status}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
