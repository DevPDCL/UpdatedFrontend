import React from "react";
import "@fontsource/ubuntu";
import video from "../../assets/heroVideo.mp4";
import { SearchBoxBranch } from "../../components";
import { branch } from "../../constants";
import { useLocation } from "react-router-dom";

const Chattogram = () => {
  const branchInfo = branch.find((b) => b.heading === "Chattogram");
  const branchName = branchInfo.heading;
 const location = useLocation();
 const queryParams = new URLSearchParams(location.search);
 const branchId = queryParams.get("id");
  return (
    <section className="relative py-32 lg:py-36 bg-white">
      <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12 pb-20">
        <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
          <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-[#00984a] blur-xl opacity-60 lg:opacity-95 lg:block hidden"></span>
          <span className="absolute right-4 top-96 w-24 h-24 rounded-3xl bg-blue-600 blur-xl opacity-80"></span>
        </div>
        <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-[#00984a] absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
        <div
          className="relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 
            lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2"
        >
          <h1
            className="text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl
            font-bold text-[#00664a]"
          >
            Popular Diagnostic Centre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#00664a]  from-20% via-[#00984a] via-30% to-blue-600">
              {branchName}{" "}
            </span>
            Branch.
          </h1>
          <div className="mt-10  w-full flex max-w-md mx-auto lg:mx-0"></div>
        </div>
        <div className="flex flex-1 relative mx-auto ">
          <video
            className="lg:absolute lg:w-full rounded-3xl object-cover shadow-2xl "
            alt="Hero Video"
            src={video}
            autoPlay
            loop
            muted
          />
        </div>
      </div>
      <div className="relative md:mt-[250px] mb-[100px]">
        <SearchBoxBranch branchId={branchId} />
      </div>
      <div className="relative">
        <div className="bg-gradient-to-bl from-transparent from-80% via-[#00984a] via-30% to-[#00664a] mt-12 mx-auto lg:max-w-7xl w-full flex flex-col lg:flex-row justify-evenly rounded-3xl items-end">
          <img
            src={branchInfo.braManImg}
            alt="Mr. Oaly Ashraf Khan "
            className="relative mx-auto h-full w-auto border-[6px] border-[#00984a] rounded-3xl"
          />
          <div className="flex lg:item-start">
            <h1 className="text-gray-500/30 text-center absolute font-bold text-[96px] -mt-10 ml-5 lg:-mt-20 lg:-ml-48 overflow-hidden">
              Branch{" "}
              <h1 className="text-gray-500/20 ml-10 -mt-16 lg:-mt-14 text-[72px] lg:ml-48">
                Manager
              </h1>
            </h1>
            <div className="relative mt-24 p-5">
              <h1 className="text-gray-600 font-bold text-[36px]">
                {branchInfo.braManName}
              </h1>
              <h1 className="text-gray-500 font-bold text-[18px]">
                {branchInfo.braManDesignation}
              </h1>
              <p className="text-black w-full">
                {" "}
                <br />
                চট্টগ্রামবাসির সুস্বাস্থ্যে ২৫% ডিসকাউন্ট সকল প্রকার টেস্টে”
                আন্তর্জাতিক মানসম্পন্ন ল্যাব, অত্যাধুনিক প্রযুক্তির বিশেষায়িত
                মেশিন ও 160+ ঢাকা ও চট্টগ্রামের বিশেষজ্ঞ ডাক্তারদের সেবার
                মেলবন্ধনে ঢাকার পপুলার এখন চট্টগ্রামে আপনার প্রয়োজনীয় সব
                স্বাস্থ্য পরীক্ষা এখন একই ছাদের নিচে আরো সাশ্রয়ী মূল্যে ও
                নির্ভরতায়। আমাদের সেবা সমূহ :  চট্টগ্রামে প্রথম ১২৮ চ্যানেলের
                বায়োমেট্রিক্স প্রযুক্তির 3 Tesla - Siemens, Germany এর MRI
                মেশিন ও ৫১২ Slice Dual এনার্জি সম্পন্ন CT Scan মেশিন এখন পপুলার
                ডায়াগনস্টিক সেন্টার, চট্টগ্রাম শাখায়।  এছাড়া ও আছে লিভার
                সিরোসিস ও ফ্যাটি লিভার রোগ নির্ণয়ে FibroScan test.  হাড়
                ক্ষয়ের নির্ভরযোগ্য পরীক্ষার জন্য BMD টেস্ট ।  ব্রেস্ট
                ক্যান্সার সহ স্তনো সব রোগ নির্ণয়ের জন্য Memography টেস্ট । 
                সর্বাধুনিক Ultrasound (Voluson E10, GE) America মেশিনে
                চট্টগ্রামের স্বনামধন্য Radiologist ও Sonologist এর মাধ্যমে
                Ultrosonogram করার ব্যবস্থা ।  হৃদপিন্ডের সমস্যা ও হৃদরোগ
                নির্ণয়ে America GE কোম্পানীর VIVID-9 মেশিনের মাধ্যমে Echo /
                Colour Doppler করা হয় ।  চট্টগ্রামের স্বনামধন্য
                Gastroenterology / Hepatology Doctor এর মাধ্যমে Endoscopy /
                Colonoscopy করানো হয় ।  দাঁতের সমস্যা নির্ণয়ে OPG করানো হয় ।
                 কানের শ্রবন শক্তি নির্ণয়ে Hearing test করানো হয় ।  বিভিন্ন
                বয়সের এবং বিভিন্ন রোগের জন্য রয়েছে হেলথ চেকআপ প্যাকেজ সুবিধা ও
                বিশেষজ্ঞ ডাক্তারের পরামর্শ ।  বাসা থেকে Blood এবং Urine Sample
                কালেকশনের সুব্যবস্থা আছে ।  অফিস কিংবা বাসায় বসে রিপোর্ট
                ডাউনলোড করার বিশেষ সুবিধা । আপনার সুস্বাস্থ্যই আমাদের অঙ্গীকার।
                আধুনিক প্রযুক্তি, নির্ভুল রিপোর্ট, সাশ্রয়ী মূল্য – সব সুবিধা
                একসাথে! আজই যোগাযোগ করুন এবং সুস্থ জীবনযাত্রার প্রথম পদক্ষেপ নিন
                পপুলার ডায়াগনস্টিক সেন্টার, চট্টগ্রাম শাখার মাধ্যমে । আমাদের
                হটলাইন নং: 09666787810
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chattogram;
