// NOTE: You would need to create this component to handle Fleet, Staff, and Partnerships views.
const BusinessPortal = ({ userRole }) => {
  if (userRole !== "business_admin")
    return <div className="text-center p-10">Access Denied.</div>;

  // TODO: Implement logic to switch between Fleet, Staff, and Partnerships views
  return (
    <div className="p-6 bg-white rounded-lg shadow min-h-full">
      <h2 className="text-2xl font-bold mb-4">Business Portal</h2>
      <p className="text-gray-600">
        This is where Fleet Management, Staff, and Partnerships tools will be
        located.
      </p>
    </div>
  );
};
export default BusinessPortal;
