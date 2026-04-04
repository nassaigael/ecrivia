// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    Edit3,
    Sparkles,
    ArrowRight,
    Globe,
    Send,
    CheckCircle,
    MailCheck
} from 'lucide-react';

const HowItWorks = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const steps = [
        {
            number: "01",
            icon: Edit3,
            title: "Rédigez votre message",
            description: "Décrivez l'intention principale de votre email. Dites ce que vous voulez communiquer en quelques phrases.",
            color: "#c23b78",
            delay: 0
        },
        {
            number: "02",
            icon: Globe,
            title: "Personnalisez",
            description: "Choisissez le ton (professionnel, amical, concis...) et la langue de votre email. Ajoutez les infos du destinataire.",
            color: "#d95c92",
            delay: 0.2
        },
        {
            number: "03",
            icon: Send,
            title: "Générez & Copiez",
            description: "L'IA de Puter rédige un email parfaitement adapté. Copiez-le et collez-le dans votre messagerie.",
            color: "#e07aa3",
            delay: 0.4
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 0.6
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, type: "spring", stiffness: 150 }
        }
    };

    const lineVariants = {
        hidden: { scaleX: 0 },
        visible: {
            scaleX: 1,
            transition: { duration: 0.8, delay: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section
            id="how-it-works"
            ref={ref}
            className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32"
            style={{
                background: "#f0e2e6",
            }}
        >
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-center mb-16"
                >
                    <div className="inline-block">
                        <h2
                            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                            style={{
                                background: "linear-gradient(135deg, #c23b78, #d95c92, #e07aa3)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text"
                            }}
                        >
                            Comment ça marche
                        </h2>
                        <div
                            className="w-24 h-1 mx-auto rounded-full"
                            style={{
                                background: "linear-gradient(90deg, #c23b78, #d95c92, #e07aa3)",
                                boxShadow: "2px 2px 4px #d0b6be, -2px -2px 4px #ffffff"
                            }}
                        />
                    </div>
                    <p className="text-base sm:text-lg max-w-2xl mx-auto mt-4" style={{ color: "#8a5a6a" }}>
                        3 étapes simples pour des emails professionnels
                    </p>
                </motion.div>

                <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0 px-20">
                    <motion.div
                        variants={lineVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="h-0.5 w-full rounded-full"
                        style={{
                            background: "linear-gradient(90deg, #c23b78, #d95c92, #e07aa3, #d95c92, #c23b78)",
                            opacity: 0.3
                        }}
                    />
                </div>

                {/* Étapes */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="relative z-10 flex flex-col lg:flex-row justify-between gap-8 lg:gap-6"
                >
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.number}
                                variants={itemVariants}
                                className="flex-1"
                            >
                                <div
                                    className="relative rounded-3xl p-8 text-center h-full transition-all duration-300 group"
                                    style={{
                                        background: "#f0e2e6",
                                        boxShadow: "25px 25px 50px #d0b6be, -25px -25px 50px #ffffff",
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 flex items-center justify-center text-[15rem] font-black opacity-12 pointer-events-none"
                                        style={{ color: step.color }}
                                    >
                                        {step.number}
                                    </div>

                                    <div className="relative z-10 flex flex-col items-center justify-center min-h-[350px]">
                                      

                                        <motion.div
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                                            style={{
                                                background: "#f0e2e6",
                                                boxShadow: "8px 8px 16px #d0b6be, -8px -8px 16px #ffffff",
                                            }}
                                        >
                                            <Icon className="h-8 w-8" style={{ color: step.color }} />
                                        </motion.div>

                                        <h3 className="text-xl font-bold mb-3" style={{ color: "#c23b78" }}>
                                            {step.title}
                                        </h3>

                                        <p className="text-sm leading-relaxed" style={{ color: "#a86a8a" }}>
                                            {step.description}
                                        </p>
                                    </div>

                                    {index < steps.length - 1 && (
                                        <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2">
                                            <div
                                                className="p-2 rounded-full"
                                                style={{
                                                    background: "#f0e2e6",
                                                    boxShadow: "6px 6px 12px #d0b6be, -6px -6px 12px #ffffff",
                                                }}
                                            >
                                                <ArrowRight className="h-5 w-5" style={{ color: "#d95c92" }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-16 text-center"
                >
                    <div
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                        style={{
                            background: "#f0e2e6",
                            boxShadow: "inset 6px 6px 12px #d0b6be, inset -6px -6px 12px #ffffff",
                        }}
                    >
                        <CheckCircle className="h-5 w-5" style={{ color: "#d95c92" }} />
                        <span className="text-sm font-medium" style={{ color: "#c23b78" }}>
                            Aucune inscription requise pour essayer
                        </span>
                        <MailCheck className="h-5 w-5" style={{ color: "#d95c92" }} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;