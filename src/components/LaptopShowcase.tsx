'use client';

export default function LaptopShowcase() {
  return (
    <section className="w-full flex flex-col justify-center items-center py-20 px-4">
        <h1 className="font-poppins text-6xl font-semibold mb-4">Demo</h1>
      <div className="relative w-full max-w-5xl">
        
        <div className="relative rounded-[28px] bg-[#0b0f1a] border border-white/10 shadow-2xl overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-6 bg-[#0f1424] flex items-center px-4 gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>

          <div className="pt-6">
            <video
              src="https://www.loom.com/share/43f63e1440e549d7bb6786f161fef43b"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-[#060912] rounded-b-3xl shadow-xl" />
      </div>
    </section>
  );
}
