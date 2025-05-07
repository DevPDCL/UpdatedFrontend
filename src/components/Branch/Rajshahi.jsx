import React from "react";
import "@fontsource/ubuntu";
import video from "../../assets/heroVideo.mp4";
import { SearchBoxBranch } from "../../components";
import { branch } from "../../constants";
import { useLocation } from "react-router-dom";

const Rajshahi = () => {
  const branchInfo = branch.find((b) => b.heading === "Rajshahi");
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
            alt="Mr. Farid Mohammad Shamim"
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
                বিসমিল্লাহির রাহমানির রাহিম। আসসালামু আলাইকুম, ১৯৮৩ইং সালের
                স্বল্প পরিসরে ঢাকায় প্রতিষ্ঠিত হয় পপুলার ডায়াগনস্টিক সেন্টার
                লিঃ। প্রতিষ্ঠার পর খুব অল্প সময়ের মধ্যে প্রতিষ্ঠানটি বাংলাদেশের
                স্বাস্থ্য খাতে গুরুত্বপূর্ণ ভুমিকায় অবতীর্ণ হয়। সেবার মানের
                উত্তোরোত্তর বৃদ্ধিতে স্বাস্থ্য সেবার লক্ষ্যে সারাদেশে একের পর এক
                শাখা গড়ে উঠে। বর্তমানে যার সংখ্যা ২২টি। ২০০৯ইং সালের অক্টোবর
                মাসে উত্তরবঙ্গের শিক্ষা ও স্বাস্থ্য নগরী খ্যাত রাজশাহী জেলায়
                শুরু হয় পপুলার ডায়াগনস্টিক সেন্টার লিঃ-এর রাজশাহী শাখার
                কার্যক্রম। প্রতিষ্ঠার পর থেকে রাজশাহী, চাঁপাইনবাবগঞ্জ,
                সিরাজগঞ্জ, জয়পুরহাট, নওগাঁ, কুষ্টিয়া, আলমডাঙ্গা, চুয়াডাঙ্গা,
                ঝিনাইদহসহ সুদূর খুলনা থেকেও সেবা নিতে আসা রোগীদের প্রধান আস্থার
                স্থান হয়ে ওঠে “পপুলার ডায়াগনস্টিক সেন্টার লিঃ, রাজশাহী শাখা”।
                রাজশাহী শাখায় বর্তমানে বাংলাদেশের সবচেয়ে বড় ও অত্যাধুনিক
                আমেরিকান রোবোটিক ল্যাবরেটরী সিস্টেম (টিএলএ) নিয়ে অত্যন্ত দক্ষতার
                সাথে সকল প্যাথলজী পরীক্ষা হাতের স্পর্শ ছাড়াই করার মাধ্যমে শতভাগ
                নির্ভুল রিপোর্টের নিশ্চয়তা প্রদান করছে। এই অত্যাধুনিক রোবোটিক
                ল্যাবরেটরী সিস্টেম (টিএলএ) থাকায় রাজশাহী তথা উত্তরবঙ্গে সঠিক রোগ
                নির্নয় করে স্বাস্থ্য সেবায় ব্যাপক পরিবর্তন সাধিত হয়েছে। এই শাখার
                ইমেজিংসহ সহ প্রতিটি বিভাগ অত্যাধুনিকতায় সর্বোৎকৃষ্ট। এই শাখায়
                রাজশাহী মেডিকেল কলেজ তথা রাজশাহী জেলার স্বনামধন্য ও খ্যাতিমান
                চিকিৎসকগণের সমন্বয়ে রয়েছে কনসালটেশন সার্ভিস। যেখানে রাজশাহী
                শাখার খ্যাতিমান ও দক্ষ চিকিৎসকগণ দূর-দুরান্ত থেকে আগত সকল
                রোগীদের অত্যন্ত আন্তরিকতা, সহানুভুতি ও দক্ষতার সাথে চিকিৎসা
                সেবার পরামর্শ প্রদান করে যাচ্ছেন। এই শাখার কর্মীরা অত্যন্ত
                দক্ষতা, নিষ্ঠা ও সততার সাথে অত্র শাখায় আগত রোগীদের নিরলস সেবা
                প্রদান করে যাচ্ছেন। যে কারণে “পপুলার ডায়াগনস্টিক সেন্টার লিঃ,
                রাজশাহী শাখা” হয়ে উঠেছে রোগীদের বিশ্বস্থতার কেন্দ্রস্থল। এ শাখার
                কর্মীরা চিকিৎসা সেবার মান প্রতিনিয়ত উন্নয়নে সর্বাত্মক ভাবে
                নিজেদের নিয়োজিত করেছেন। “থাকবো সাধারণ, কাজ করবো অসাধারণ”এই
                মূলমন্ত্রে দিক্ষিত হয়ে কাজ করে যাচ্ছে পপুলার ডায়াগনস্টিক সেন্টার
                লিঃ, রাজশাহী শাখার প্রতিটি কর্মী। ফরিদ মোহাম্মদ শামীম এজিম এন্ড
                হেড অব ব্রাঞ্চ পপুলার ডায়াগনস্টিক সেন্টার লিঃ রাজশাহী শাখা
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Rajshahi;
