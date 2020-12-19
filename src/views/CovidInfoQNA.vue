<template>
    <v-container fluid>
        <h4 class="font-weight-medium ml-3">COVID-19 Information and Q&A</h4>
        <v-row class="ma-0">
            <v-col sm="12">
                <v-expansion-panels accordion focusable>
                    <v-expansion-panel v-for="(info, index) in covidInfo" :key="index">
                        <v-expansion-panel-header class="subtitle-2 pt-0 pb-0">{{
                            info.question
                        }}</v-expansion-panel-header>
                        <v-expansion-panel-content class="pt-4 pb-0">
                            <p class="body-2" v-for="(answer, index) in info.answer" :key="index">{{ answer }}</p>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            covidInfo: [
                {
                    question: 'How does COVID-19 spread?',
                    answer: [
                        'People can catch COVID-19 from others who have the virus. The disease can spread from person to person through small droplets from the nose or mouth which are spread when a person with COVID-19 coughs or exhales. These droplets land on objects and surfaces around the person. Other people then catch COVID-19 by touching these objects or surfaces, then touching their eyes, nose or mouth. People can also catch COVID-19 if they breathe in droplets from a person with COVID-19 who coughs out or exhales droplets. This is why it is important to stay more than 1 meter (3 feet) away from a person who is sick.'
                    ]
                },
                {
                    question: 'What are the symptoms of COVID-19?',
                    answer: [
                        "The most common symptoms of COVID-19 are fever, tiredness, and dry cough. Some patients may have aches and pains, nasal congestion, runny nose, sore throat or diarrhea. These symptoms are usually mild and begin gradually. Some people become infected but don’t develop any symptoms and don't feel unwell. Most people (about 80%) recover from the disease without needing special treatment. Around 1 out of every 6 people who gets COVID-19 becomes seriously ill and develops difficulty breathing. Older people, and those with underlying medical problems like high blood pressure, heart problems or diabetes, are more likely to develop serious illness. People with fever, cough and difficulty breathing should seek medical attention."
                    ]
                },
                {
                    question: 'How do I know if it is COVID-19 or just the common flu?',
                    answer: [
                        'A COVID-19 infection has the same signs and symptoms as the common cold and you can only differentiate them through laboratory testing to determine the virus type.'
                    ]
                },
                {
                    question: 'Can the virus that causes COVID-19 be transmitted through the air?',
                    answer: [
                        'Studies to date suggest that the virus that causes COVID-19 is mainly transmitted through contact with respiratory droplets rather than through the air. See previous answer on “How does COVID-19 spread?”'
                    ]
                },
                {
                    question: 'What can I do to protect myself and prevent the spread of disease?',
                    answer: [
                        'Regularly and thoroughly clean your hands with an alcohol-based hand rub or wash them with soap and water. Why? Washing your hands with soap and water or using alcohol-based hand rub kills viruses that may be on your hands.',
                        'Maintain at least 1 meter (3 feet) distance between yourself and anyone who is coughing or sneezing. Why? When someone coughs or sneezes, they spray small liquid droplets from their nose or mouth which may contain virus. If you are too close, you can breathe in the droplets, including the COVID-19 virus if the person coughing has the disease.',
                        'Avoid touching eyes, nose and mouth. Why? Hands touch many surfaces and can pick up viruses. Once contaminated, hands can transfer the virus to your eyes, nose or mouth. From there, the virus can enter your body and can make you sick.',
                        'Make sure you, and the people around you, follow good respiratory hygiene. This means covering your mouth and nose with your bent elbow or tissue when you cough or sneeze. Then dispose of the used tissue immediately. Why? Droplets spread virus. By following good respiratory hygiene, you protect the people around you from viruses such as cold, flu and COVID-19.',
                        'Stay home if you feel unwell. If you have a fever, cough and difficulty breathing, seek medical attention and call in advance. Follow the directions of your local health authority.',
                        'Keep up to date on the latest COVID-19 hotspots (cities or local areas where COVID-19 is spreading widely). If possible, avoid traveling to places – especially if you are an older person or have diabetes, heart or lung disease. Why? You have a higher chance of catching COVID-19 in one of these areas.'
                    ]
                },
                {
                    question: 'I am well and asymptomatic. Should I use a mask?',
                    answer: [
                        'According to the WHO, for individuals without respiratory symptoms, a medical mask is not required, as no evidence is available on its usefulness to protect non-sick persons.',
                        'However, masks might be worn in some countries according to local cultural habits. If masks are used, best practices should be followed on how to wear, remove, and dispose of them and on hand hygiene action after removal. For more information, visit the WHO guidance on use of masks in the community.'
                    ]
                },
                {
                    question: 'How likely am I to catch COVID-19?',
                    answer: [
                        'The risk depends on where you are - and more specifically, whether there is a COVID-19 outbreak unfolding there.',
                        'For most people in most locations the risk of catching COVID-19 is still low. However, there are now places around the world (cities or areas) where the disease is spreading. For people living in, or visiting, these areas the risk of catching COVID-19 is higher. Governments and health authorities are taking vigorous action every time a new case of COVID-19 is identified. Be sure to comply with any local restrictions on travel, movement or large gatherings. Cooperating with disease control efforts will reduce your risk of catching or spreading COVID-19.',
                        'COVID-19 outbreaks can be contained and transmission stopped, as has been shown in China and some other countries. Unfortunately, new outbreaks can emerge rapidly. It’s important to be aware of the situation where you are or intend to go. WHO publishes daily updates on the COVID-19 situation worldwide.'
                    ]
                },
                {
                    question: 'Are pregnant women more susceptible to the COVID-19 virus and will it harm the fetus?',
                    answer: [
                        'We do not have information from published scientific reports about the susceptibility of pregnant women to COVID-19. Pregnant women experience immunologic and physiologic changes, which might make them more susceptible to viral respiratory infections, including COVID-19.',
                        'The virus that causes COVID-19 is thought to spread mainly by close contact with an infected person through respiratory droplets. Whether a pregnant woman with COVID-19 can transmit the virus that causes COVID-19 to her fetus or neonate by other routes of vertical transmission (before, during, or after delivery) is still unknown.'
                    ]
                },
                {
                    question: 'What is the risk of my child becoming sick with COVID-19?',
                    answer: [
                        'Based on available evidence, children do not appear to be at higher risk for COVID-19 than adults. While some children and infants have been sick with COVID-19, adults make up most of the known cases to date. You can learn more about who is most at risk for health problems if they have COVID-19 infection on CDC’s current Risk Assessment page.'
                    ]
                },
                {
                    question: 'Are the symptoms of COVID-19 different in children than in adults?',
                    answer: [
                        'No. The symptoms of COVID-19 are similar in children and adults. However, children with confirmed COVID-19 have generally presented with mild symptoms. Reported symptoms in children include cold-like symptoms, such as fever, runny nose, and cough. Vomiting and diarrhea have also been reported. It’s not known yet whether some children may be at higher risk for severe illness, for example, children with underlying medical conditions and special healthcare needs. There is much more to be learned about how the disease impacts children.'
                    ]
                },
                {
                    question: 'Should I worry about COVID-19?',
                    answer: [
                        'Illness due to COVID-19 infection is generally mild, especially for children and young adults. However, it can cause serious illness: about 1 in every 5 people who catch it need hospital care. It is therefore quite normal for people to worry about how the COVID-19 outbreak will affect them and their loved ones.',
                        'We can channel our concerns into actions to protect ourselves, our loved ones and our communities. First and foremost, among these actions is regular and thorough hand-washing and good respiratory hygiene. Secondly, keep informed and follow the advice of the local health authorities including any restrictions put in place on travel, movement and gatherings.'
                    ]
                },
                {
                    question: 'Who is at risk of developing severe illness?',
                    answer: [
                        'While we are still learning about how COVID-2019 affects people, older persons and persons with pre-existing medical conditions (such as high blood pressure, heart disease, lung disease, cancer or diabetes) appear to develop serious illness more often than others.'
                    ]
                },
                {
                    question: 'Are antibiotics effective in preventing or treating COVID-19?',
                    answer: [
                        'No. Antibiotics do not work against viruses, they only work on bacterial infections. COVID-19 is caused by a virus, so antibiotics do not work. Antibiotics should not be used as a means of prevention or treatment of COVID-19. They should only be used as directed by a physician to treat a bacterial infection.'
                    ]
                },
                {
                    question: 'Are there any medicines or therapies that can prevent or cure COVID-19?',
                    answer: [
                        'While some western, traditional or home remedies may provide comfort and alleviate symptoms of COVID-19, there is no evidence that current medicine can prevent or cure the disease. WHO does not recommend self-medication with any medicines, including antibiotics, as a prevention or cure for COVID-19. However, there are several ongoing clinical trials that include both western and traditional medicines.'
                    ]
                },
                {
                    question: 'Is there a vaccine, drug or treatment for COVID-19?',
                    answer: [
                        'Not yet. To date, there is no vaccine and no specific antiviral medicine to prevent or treat COVID-2019. However, those affected should receive care to relieve symptoms. People with serious illness should be hospitalized. Most patients recover thanks to supportive care.',
                        'Possible vaccines and some specific drug treatments are under investigation. They are being tested through clinical trials. WHO is coordinating efforts to develop vaccines and medicines to prevent and treat COVID-19.',
                        'The most effective ways to protect yourself and others against COVID-19 are to frequently clean your hands, cover your cough with the bend of elbow or tissue, and maintain a distance of at least 1 meter (3 feet) from people who are coughing or sneezing. (See Basic protective measures against the new coronavirus).'
                    ]
                },
                {
                    question: 'Should I wear a mask to protect myself from catching the COVID-19 virus?',
                    answer: [
                        'Only wear a mask if you are ill with COVID-19 symptoms (especially coughing) or looking after someone who may have COVID-19. Disposable face mask can only be used once. If you are not ill or looking after someone who is ill then you are wasting a mask. There is a world-wide shortage of masks, so WHO urges people to use masks wisely.',
                        'WHO advises rational use of medical masks to avoid unnecessary wastage of precious resources and mis-use of masks.',
                        'The most effective ways to protect yourself and others against COVID-19 are to frequently clean your hands, cover your cough with the bend of elbow or tissue and maintain a distance of at least 1 meter (3 feet) from people who are coughing or sneezing.'
                    ]
                },
                {
                    question:
                        'Until when should I wear a mask after recovering from an illness with respiratory symptoms?',
                    answer: [
                        'In order to avoid infecting others, you should use a mask for as long as you are still coughing or sneezing. You should only stop after a complete recovery (which means 24-48 hours after having no symptoms without medication).'
                    ]
                },
                {
                    question: 'How long is the incubation and transmission period for COVID-19?',
                    answer: [
                        'The “incubation period” means the time between catching the virus and beginning to have symptoms of the disease. Most estimates of the incubation period for COVID-19 range from 1-14 days, most commonly around five days.'
                    ]
                },
                {
                    question: 'Can people who recover from COVID-19 be infected again?',
                    answer: [
                        'We know that for similar coronaviruses, infected people are unlikely to be re-infected shortly after they recover. However, because the immune response to COVID-19 is not yet understood, it is not yet known whether similar immune protection will be observed for patients who have recovered from COVID-19.'
                    ]
                },
                {
                    question:
                        'Can I catch the virus from being in an enclosed space (i.e. bus, subway) in close proximity to someone who doesn’t have respiratory symptoms?',
                    answer: [
                        'Since the virus is transmitted through respiratory droplets, the risk of catching it from somebody who is asymptomatic, even a contact of a confirmed COVID-19 case, is low. However, in light of the pandemic, everyone should maintain social distancing, which means keeping at least 1 meter away from others, avoiding mass gatherings and areas with large numbers of people, and practicing frequent hand washing and hand sanitizing according to the recommendation.'
                    ]
                },
                {
                    question: 'When should we identify ourselves as "being sick" and stay at home?',
                    answer: [
                        'Although a fever is a sure sign that you are sick enough not to come to work, anyone experiencing respiratory symptoms like coughing and sneezing should stay at home.'
                    ]
                }
            ]
        }
    },
    methods: {
        onSignin() {
            this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
            // EventBus.$emit('showLeftPanel')
        },
        onDismissAlert() {
            this.$store.dispatch('clearError')
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        loading() {
            return this.$store.getters.loading
        },
        error() {
            return this.$store.getters.error
        }
    },
    watch: {
        user(value) {
            if (value !== null && value !== undefined) {
                //this.$router.push('/')
            }
        }
    }
}
</script>
