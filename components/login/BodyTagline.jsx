import Image from "next/image";
import sober from "../../public/loginAssets/sober.png";

const BodyTagline = () => {
  return (
    <div className="col-md-5 col-sm-12 col-lg-7 col-xl-6 text-center img-tagline-area">
      {/* <img src="/sober.png" className="img-fluid img-tagline mb-sm-4 mb-3" alt="sober" /> */}
      <Image src={sober} layout="intrinsic" width={"360px"} height={"120px"} alt="Sober" className="mb-sm-4 mb-3 img-tagline" />
      <p id="text-tagline">Born To Dress Like King & Queen</p>
    </div>
  );
};

export default BodyTagline;
