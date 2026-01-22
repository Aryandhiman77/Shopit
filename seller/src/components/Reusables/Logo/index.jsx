import logo from "../../../assets/logo.svg";

const PanelLogo = () => {
  return (
    <div>
      <div className="p-6 font-bold text-xl text-[#1260cc] relative">
        <img src={logo} />
        <span className="absolute bottom-4 left-40">Seller</span>
      </div>
    </div>
  );
};

export default PanelLogo;
