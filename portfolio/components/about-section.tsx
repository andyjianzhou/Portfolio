import { Card } from "@/components/ui/card"

export default function AboutSection() {
  const skills = ["React & Next.js", "Three.js & WebGL", "TypeScript", "Node.js", "UI/UX Design", "Creative Coding"]

  return (
    <section id="about" className="min-h-screen flex items-center py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">About Me</h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              I'm a creative developer passionate about pushing the boundaries of web technology. With expertise in
              modern frameworks and a keen eye for design, I create immersive digital experiences that captivate and
              engage users.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or
              experimenting with generative art and interactive installations.
            </p>
          </div>
          <div className="space-y-8">
            {/* Professional Photo */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border-0">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden shadow-2xl">
                    {/* Replace this placeholder with your actual photo */}
                    <img 
                      src="/api/placeholder/160/160" 
                      alt="Andy Zhou" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">Andy Zhou</h3>
                <p className="text-gray-200 text-base">Software Engineer</p>
              </div>
            </div>
            
            {/* Skills Section */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-10 shadow-2xl border-0">
              <h3 className="text-2xl font-semibold mb-8 text-white tracking-tight">Skills & Technologies</h3>
              <div className="grid grid-cols-2 gap-5">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl py-4 px-6 text-center text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300 shadow-lg border-0"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
