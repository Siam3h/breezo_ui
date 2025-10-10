import app_img2 from "/app_interface.webp"
import app_store_img from "/app_store_image.webp"

export default function FAQ() {
  return (
    <div id="footerCTA" className="pt-28 pb-24 text-white bg-gray-900 md:pt-24">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-5 flex flex-col items-center lg:items-start space-y-12 lg:space-y-0">
          
          {/* Left: App mockup image */}
          <div className="flex justify-center lg:justify-start lg:col-span-7">
            <figure>
              <img
                src={app_img2}
                alt="Lime app mockup"
                className="w-full max-w-[460px]"
                loading="lazy"
              />
            </figure>
          </div>

          {/* Right: Text and download buttons */}
          <div className="flex flex-col justify-center items-center lg:items-start lg:col-span-5 space-y-8 max-w-[610px]">
            <h2 className="text-3xl md:text-4xl font-bold text-center lg:text-left">
              Download the App
            </h2>

            <div className="flex space-x-4">
              {/* Apple Store */}
              <a
                href="https://apps.apple.com/app/breezoelectric"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
              >
                <img
                  src={app_store_img}
                  alt="App Store badge"
                  className="h-[50px]"
                />
              </a>

              {/* Google Play */}
              <a
                href="https://play.google.com/store/apps/details?id=breezoelectric"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Google Play badge"
                  className="h-[50px] scale-150 ms-5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
