import React from "react";

const SkillCard = ({ skill }) => {
  return (
    <div
      className="bg-white/10 p-6 rounded-2xl w-full max-w-lg 
                 backdrop-blur-md border border-white/20 shadow-xl 
                 text-center mx-auto"
    >
      <h3 className="text-2xl font-bold mb-3 text-white">
        {skill.title}
      </h3>
      <p className="text-gray-300">
        {skill.shortDescription}
      </p>
    </div>
  );
};

export default SkillCard;
