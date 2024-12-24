"use client";

import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import ViewChannelIntegration from "@/components/channelIntegraion/ViewChannel";


const Page = () => {
  return (
      <div className="mt-[2vh]">
        <ViewChannelIntegration/>
    </div>
  );
};

export default Page;
