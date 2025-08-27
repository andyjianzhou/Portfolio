import { Card } from "@/components/ui/card"

export default function AboutSection() {
  const skills = ["React & Next.js", "Three.js & WebGL", "TypeScript", "Node.js", "UI/UX Design", "Creative Coding"]

  return (
    <section id="about" className="min-h-screen flex items-center py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-black">About Me</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              I'm a creative developer passionate about pushing the boundaries of web technology. With expertise in
              modern frameworks and a keen eye for design, I create immersive digital experiences that captivate and
              engage users.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or
              experimenting with generative art and interactive installations.
            </p>
          </div>
          <Card className="bg-gray-50/80 backdrop-blur-sm border-gray-200 p-8">
            <h3 className="text-2xl font-bold mb-6 text-black">Skills & Technologies</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg p-3 text-center text-black hover:bg-gray-200 transition-colors duration-300"
                >
                  {skill}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
