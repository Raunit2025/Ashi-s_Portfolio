import React from "react";

const SkillCard = ({ skill, onClick }) => {
  return (
    <div
      className="bg-white/10 p-8 rounded-2xl w-full max-w-lg 
                 backdrop-blur-md border border-white/20 shadow-xl 
                 text-center mx-auto cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-3xl font-bold text-white mb-2">
        {skill.title}
      </h2>
      <p className="text-lg text-cyan-400 mb-4">
        {skill.category}
      </p>
      <p className="text-gray-300">
        {skill.shortDescription}
      </p>
    </div>
  );
};

export default SkillCard;