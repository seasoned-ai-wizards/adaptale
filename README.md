# Made with T3 App Stack

This project was kickstarted with [T3 App Stack](https://create.t3.gg/) and created during [OpenAI Hackathon](https://warsaw.aitinkerers.org/p/openai-x-ai-tinkerers-hackathon-warsaw).

## About authors
- [Olga Jakubowska](https://www.linkedin.com/in/olga-jakubowska/) - Head of Product @[Virbe.ai](https://virbe.ai/)
- [Antares Gryczan](https://www.linkedin.com/in/antares-gryczan-b16509b/) - Head of AI @ OChK  
- [Maciej Muchlinski](https://www.linkedin.com/in/maciej-muchlinski/) - Tech Lead - AI Algorithm Engineer at Intel Corporation
- [Maksymilian Majer](https://www.linkedin.com/in/maksymilianmajer/) - Principal Engineer @ [Nursa](https://nursa.com/)
- [Krzysztof (Chris) Wrobel](https://www.linkedin.com/in/chris-wrobel/) - Founder and CEO @[Virbe.ai](https://virbe.ai/)


## Setup

To get started and install all dependencies, run the following commands:
```bash
pnpm install
```

Head out to `apps/web` and create `.env` file using the `.env.example` as a template:
```bash
cp .env.example .env

# Fill out the .env file with your configuration, but most importantly ElevenLabs Agent credentials
vim .env
```

Make sure to fill out the `.env` file with your OpenAI Credentials:
```
...

# OpenAI Api credentials
OPENAI_API_KEY=<your-agent-id>

...
```

To launch the development server, run the following command:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!
