export default function ServiceCard({ icon, title, description, requirements = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-start group hover:-translate-y-1">
      <div className="w-14 h-14 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center text-2xl mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-800 mb-1 text-base">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-3">{description}</p>
      {requirements.length > 0 && (
        <div className="w-full rounded-xl bg-gray-50 border border-gray-200 p-3 text-left">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Required documents</p>
          <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
            {requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
