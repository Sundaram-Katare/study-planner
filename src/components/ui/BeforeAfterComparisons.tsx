import { X, Check, Calendar, TrendingUp, Clock, Brain, HandFistIcon, Hand } from 'lucide-react';

export default function BeforeAfterComparison() {
  return (
    <section className="py-16 px-6 ">
      <div className='flex flex-col space-y-20 m-16 p-16' >
        <div className='grid grid-cols-2 gap-20'>
          <div className=''>
            <img src="/before.png" className=' rounded-xl border border-cyan-400 shadow-[0_0_20px_3px_rgba(0,255,255,0.5)] bg-black' alt="" />
          </div>

          <div className='flex justify-center items-center text-center'>
            Say Bye to Stress.
          </div>
        </div>

        <div className='grid grid-cols-2 gap-20'>
          <div className='flex justify-center items-center text-center'>
            Say Bye to Stress.
          </div>

          <div>
            <img src="/after.png" alt="" className=' rounded-xl border border-cyan-400 shadow-[0_0_20px_3px_rgba(0,255,255,0.5)] bg-black' />
          </div>
        </div>
      </div>
    </section>
  );
}

