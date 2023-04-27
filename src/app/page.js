"use client"
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';


export default function Index() {


  useEffect(() => {
    redirect('/online/dashboard');
  }, []);
}
