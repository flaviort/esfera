'use client'

// components
import TextReveal from '@/components/Utils/Animations/TextReveal'

export default function Testimonials() {
    return (
        <section className='py-15 sm:py-20 md:py-25 xl:py-30'>
            <div className='base-container'>
                <div className='block border-t border-t-gray-lightest pt-15'>

                    <TextReveal>
                        <h2 className='text-30'>
                            Afinal, reconhecimento <span className='text-yellow'>faz a diferença</span>
                        </h2>
                    </TextReveal>
                
                </div>
            </div>
        </section>
    )
}