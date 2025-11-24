---
date: 2025-11-24
draft: false
image: null
image-credit: null
summary: This concept note introduces a GraphRAG approach to extracting knowledge
  from global development documentation and invites partners to contribute.
tags: []
title: GraphRAG for Global Development - Concept Note
---

## Summary
Collaboration within and across organizations is frequently constrained by information silos and the absence of interoperable frameworks that translate data into shared meaning. This is especially problematic in the humanitarian aid and international development sectors, where defragmentation can lead to inefficiencies and, at worst, unintended consequences resulting in harm. At a time when international development institutions are facing defunding and restructuring, the preservation and transfer of knowledge between organizations is increasingly important.

This concept note presents a *Graph Retrieval Augmented Generation* (GraphRAG) framework for extracting and contextualizing knowledge from international development document repositories. The proposed project builds upon previous work on knowledge organizational systems for international development, extending existing knowledge graphs to create a shared vocabulary for global development and subsequently extract actionable insights grounded in document repositories. 

Interested partners are invited to contribute (1) access to document repositories, (2) controlled vocabularies (e.g., taxonomies and ontologies), and (3) support evaluating the system outputs.
## Introduction
Official development assistance (ODA) and humanitarian aid have historically provided modernizing support for developing countries and aid in response to humanitarian disasters. Recent isolationist and protectionist political trends have led to the defunding and dismantling of humanitarian aid and international development organizations around the world[^1].

In July 2025, following a five month freeze of foreign aid, the U.S. shut down the U.S. Agency for International Development (USAID), eliminating 80% of USAID’s programs worldwide [2]. The website *USAID Stop Work*, which tracks jobs lost as a direct result of the shutdown, reports that 20,490 domestic jobs and 238,433 global jobs have been lost as of September 19, 2025 [3]. The departure of these professionals represents a profound loss of institutional memory, tacit expertise, and relationship networks that underpin effective international development practice.

Following the funding freeze and shut down, government websites that served as knowledge repositories for USAID staff and for the public were taken offline [4]. Knowledge repositories no longer available include the LINKS sites--a series of sectoral or thematic online platforms--and the Development Experience Clearinghouse (DEC)--USAID's central repository and public archive for development knowledge. These repositories each maintained thousands of knowledge resources and served as part of USAID’s broader effort to encourage learning in the organization and with partners.

In response, efforts such as the USAID Knowledge Rescue initiative, led by former Chief Knowledge Management Officer Stacey Young and knowledge management expert Nancy White, have emerged to safeguard decades of development knowledge[^2]. While these preservation efforts are critical, they represent only a first step. The greater challenge lies in ensuring that this wealth of institutional memory remains discoverable and useful to the current community of development professionals as well as to future practitioners.

[^1]: The OECD projects a 9 to 17% drop in total global ODA in 2025 resulting largely from cuts by the United States, France, Germany, and the United Kingdom, which comes on top of a 9% drop in 2024. See [1].
[^2]: LinkedIn Group: USAID Knowledge Rescue, available at https://www.linkedin.com/groups/13183386/ (accessed 8 October 2025).
## Proposed Solution
Advances in Artificial Intelligence (AI), combined with modern techniques for knowledge representation and retrieval, have the potential to support the preservation of the knowledge legacy of USAID, the translation of knowledge to new contexts, and the discovery of new insights. 

Current approaches to organize and distribute development knowledge focus on document repositories and data hubs such as USAID’s DEC, the World Bank’s Open Knowledge Repository (OKR), and the Humanitarian Data Exchange (HDX). These platforms rely on conventional keyword search and metadata filtering for ad-hoc resource discovery. Keyword search is inherently constrained to explicit, de-contextualized, and easily codified knowledge. However, knowledge management research shows that most organizational knowledge is tacit, situated, and socially constructed—making discovery through simple text matching fundamentally limited [6] [7].

Recognizing these limitations, international development organizations have developed domain-specific taxonomies and ontologies to improve the discoverability and interoperability of knowledge across and within institutions. Initiatives such as the [United Nations Bibliographic Information System (UNBIS) Thesaurus](https://metadata.un.org/thesaurus/?lang=en)  and the [Sustainable Development Goals (SDG) Taxonomy](https://metadata.un.org/sdg/?lang=en) aim to standardize how concepts, sectors, and themes are described. While these efforts improve consistency, cross-institutional learning at scale will require a more expressive, machine-readable layer capable of connecting concepts across documents and institutions.

Recent work has highlighted the value of knowledge graphs as a shared semantic layer for integrating data related to global development, particularly around tracking progress toward the United Nations Sustainable Development Goals (SDGs). Notable efforts include the SDG Knowledge Organization System [8] and SustainGraph [9]. Building on these initiatives, this project proposes a knowledge graph designed specifically to support cross-institutional learning and large-scale knowledge synthesis. Implemented using the Resource Description Framework (RDF) and grounded in standard taxonomies and ontologies, the graph will represent entities, relationships, and document metadata in a machine-readable, standards-compliant format. It will enable two core capabilities:

- **Data linking and enrichment:** Entities extracted from text are mapped to established taxonomies and ontologies such as UNBIS and the SDG taxonomy, ensuring semantic interoperability and enabling reuse across organizations. Additional enrichment is achieved by linking entities to external knowledge bases on the semantic web (e.g., Wikidata [10]).
- **Progressive synthesis for knowledge extraction:** Using the GraphRAG (graph retrieval-augmented generation) methodology, graph algorithms identify communities of related text, which are then synthesized by a large language model (LLM). This allows the system to surface higher-order patterns and support sensemaking and question-answering workflows.

The proposed solution will be delivered as an online, chat-based interface that enables open-domain, knowledge-graph-aware question answering.

Similar projects of note available on the web include:
- **[LinkedSDG](https://linkedsdg.officialstatistics.org/):** extracts from an uploaded document the most relevant sustainable development goals, key concepts linked to the UNBIS Thesaurus, and geographies.
- **[DECipher](https://devme.ai/):** supports chat-based QA and knowledge discovery for over 13,000 documents in the USAID DEC.
## Key Concepts
This section defines key terms and concepts that provide the foundation for this work. 
### Linked Data & the Semantic Web
[Linked Data](https://www.w3.org/DesignIssues/LinkedData) refers to a set of best practices for publishing structured data on the web. Wikidata is a visible example of the adoption and application of the Linked Data principles.

Linked Data relies on documents containing data in RDF format. RDF is a framework used to represent and exchange data on the web, focusing primarily on describing relationships between resources through a structure of subject-predicate-object triples. RDF assigns a Universal Resource Identifier (URI) to each entity, property, or field. Collections of related RDF statements comprise a directed graph that maps the relationships among entities. The [World Wide Web Consortium](https://www.techtarget.com/whatis/definition/W3C-World-Wide-Web-Consortium) (W3C) maintains the standards for RDF, including the foundational concepts, semantics, and specifications for different formats. Data stored in RDF graphs are queried with SPARQL (a recursive acronym for SPARQL Protocol and RDF Query Language).

Linked Data and the RDF format together are important components of the Semantic Web, a project that intends to add computer-processable meaning (i.e., semantics) to the World Wide Web [11]. While the promise of the Semantic Web was never fully realized [12], and the advent of LLMs have altered the need for such structured representations given their ability to use word embeddings to derive semantic meaning [13], the philosophical underpinning of Linked Data still holds promise for achieving cross-organization interoperability and long-term knowledge integration. 
###  Knowledge Graphs
A knowledge graph is a structured representation of knowledge where domain-specific meanings are associated with nodes and edges [14]. Knowledge graphs may be represented by subject-predicate-object triples, often in combination with RDF for uniquely identifying entities using a URI, or in a labeled property graph structure which associate properties and values with each node and edge.

Knowledge graphs have recently emerged as a promising approach to improve the performance of QA applications, reducing hallucinations and enabling knowledge synthesis over large corpora [15] [16] [5].
### Large Language Models
LLMs have revolutionized the field of Natural Language Processing (NLP) in recent years [16]. LLMs support QA systems by generating text in response to user queries. During pre-training, LLMs store “parametric knowledge” that encodes basic facts found in the training data and a pseudo-understanding of the world that enables human-like responses. However, LLMs tend to hallucinate when when queries fall outside the scope of their encoded or confidently retrievable knowledge [15]. 
### GraphRAG
GraphRAG is a modern approach to knowledge representation and reasoning that combines the structure of a knowledge graph with the power of LLMs to incorporate domain-specific knowledge in query responses, reduce hallucinations, and better support sensemaking queries in QA systems [5]. Sensemaking queries are those that require global understanding of the corpus and cannot be inferred from a limited selection of retrieved sources as in traditional RAG systems. 

GraphRAG first builds a knowledge graph from a corpus, extracting entities and "claims" which represent short factual statements about the relationship between entities in subject-predicate-object triples. Next, it uses a graph partitioning algorithm to identify closely related text. An LLM is used to generate summaries of these communities in a hierarchical fashion where higher-level summaries incorporate lower-level summaries. GraphRAG has been shown to strongly outperform traditional RAG when using GPT-4 as the LLM [5]. 
## Approach
This project intends to deploy a proof-of-concept suitable for evaluating additional investment and determining future directions. The proposed system will extract structured knowledge in the form of a knowledge graph and enable graph-based retrieval-augmented generation following the GraphRAG framework. The pipeline will integrate document parsing, embedding, graph construction and community summarization with a query interface for user interaction. Code for this project is available on [GitHub](https://github.com/eriktuck/world-bank-kg).

![world-bank-kg-diagram](https://storage.googleapis.com/ei-dev-assets/assets/world-bank-kg-diagram.png)

**Figure 1.**  System overview showing document parsing, embedding, graph construction and community summarization integrated with a query interface for user interaction. Documents will be ingested from accessible repositories such as the World Bank OKR.
### Implementation Plan
The following section introduces components of the proposed implementation. It also identifies specific points in the pipeline where partner organizations are invited to contribute taxonomies, datasets, and expertise to help shape and improve the system.
#### Knowledge graph construction
This project invites partners to contribute existing controlled vocabularies, thematic frameworks, and organizational taxonomies. These will be aligned and integrated into a shared RDF knowledge graph, creating a common semantic layer that supports document synthesis and search. The knowledge graph will serve as the backbone for all subsequent retrieval, synthesis, and question-answering capabilities.
#### Document ingestion
The system will include a pipeline for ingesting and converting development documents into machine-readable text. Initially, documents will be sourced through the World Bank API (Application Programming Interface). However, this project also invites partners to share available repositories for future integration.

The pipeline will use a modern PDF parser capable of preserving key document structure such as sections, tables, and figures. Each document will be converted into a set of coherent text segments ("chunks"), with associated headers and metadata, ensuring that context is preserved for downstream retrieval and analysis. Document segments will be stored in a document store and transformed into a vector representation in a searchable index for later retrieval given a user query.
#### Named entity extraction
Named entities (e.g., organizations, locations, and sector-specific terms) will be identified using a practical named-entity recognition (NER) workflow. Extracted terms will be normalized and linked to the knowledge graph, enabling cross-document and cross-institution alignment. Entities will also be linked to authoritative external sources such as Wikidata. This will enrich the graph with attributes like geographic region, governance type, or sector classification, strengthening the system’s ability to detect thematic connections across documents. Entities that cannot be matched to an existing ontology will be retained using locally defined identifiers, ensuring that the graph remains complete even as it expands.
#### Graph summarization
Following the GraphRAG framework, graph algorithms will be used to identify communities of related text based on commonalities in entities and themes. For each community, a large language model will generate concise, human-readable summaries. These will provide users with an accessible overview of recurring themes, emerging issues, and cross-cutting insights across the corpus. Community summaries will support high-level sensemaking queries for question answering tasks.
#### Query interface
The final system will be offered through a chat-based interface. In response to user questions in natural language, the system will retrieve relevant text from documents and community summaries and generate grounded, evidence-based answers. Responses will include citations from the underlying documents and links into the knowledge graph for deeper exploration.
### Evaluation
The best way to evaluate a system of this type is by evaluating its performance as embedded in its intended application [17]. Feedback from domain experts will be sought throughout system development. For the purpose of intermediate testing and optimization, evaluation will follow the process proposed by [5], which employs an "LLM as a judge" to evaluate the completeness and accuracy of answers generated to questions likely to be passed by users of this system. Evaluation of retrieval will employ common retrieval metrics, such as Mean Reciprocal Rank (MRR), Normalized Discounted Cumulative Gain (nDCG), Recall@K, and Precision@K. 
## Anticipated Impact
In international development, knowledge cannot be treated as a universally transferable commodity; it must be contextualized to remain meaningful and actionable. Development challenges are embedded in local social, cultural, institutional, and ecological systems, and lessons that hold true in one setting may fail entirely in another. For example, an intervention that successfully reduces downtime in rural water pumps in sub-Saharan Africa may depend on specific supply-chain networks or community management models that do not exist elsewhere. Simply transferring the “what worked” without the “why” risks misapplication or policy failure.

This project presents a step toward knowledge discovery and representation that supports contextualized learning and contributes to defragmenting the global development knowledge landscape. It advances this goal through:

- **Translation of institutional jargon:** the system will harmonize acronyms and technical terminology across organizations, mitigating the semantic isolation that limits cross-institutional understanding and reuse. By enabling automatic translation between domain-specific languages, it will lower conceptual barriers between agencies and disciplines.
- **Multi-vocabulary semantic integration:** The RDF-based knowledge graph will align multiple controlled vocabularies, such as UNBIS, SDG Taxonomy, and Wikidata, into a unified framework. This interoperability supports linked data publication and facilitates cross-repository search and comparison, addressing long-standing fragmentation in how aid knowledge is represented and indexed.
- **Contextualization through interlinking and progressive summarization:** by extracting entities and relationships from text and generating community-level summaries, the system situates knowledge within broader thematic and institutional contexts. This enables users to trace conceptual linkages and dependencies, transforming isolated documents into a connected web of understanding.

While these contributions support greater semantic coherence across development knowledge systems, human-mediated sensemaking remains essential. Technical integration alone cannot substitute for the interpretive judgment, tacit insight, and contextual adaptation that practitioners bring to knowledge exchange. Effective knowledge management systems in this domain therefore require both structured, inter-operable information architectures and sustained human dialogue, ensuring that lessons are interpreted in context and translated into better decisions.
## References
[1] Organisation for Economic Co-operation and Development. 2025. Cuts in official development assistance: OECD projections for 2025 and the near term. 26 (2025).doi:10.1787/8c530629-en

[2] Mary Kekatos and Chris Boccia. 2025. USAID programs now being run by State
Department as agency ends operations. https://abcnews.go.com/Health/usaid-programs-now-run-state-department-agency-ends/story?id=123373289 Accessed 8 October 2025.

[3] USAID Stop Work Project 2025. USAID Stop Work. USAID Stop Work Project. https://usaidstopwork.org/ Accessed 8 October 2025.

[4] WIRED Staff. 2025. US Government Websites Are Disappearing in Real Time. https://www.wired.com/story/us-government-websites-are-disappearing-in-real-time/ Accessed: 2025-10-08.

[5] Darren Edge, Ha Trinh, Newman Cheng, Joshua Bradley, Alex Chao, Apurva Mody, Steven Truitt, Dasha Metropolitansky, Robert Osazuwa Ness, and Jonathan Larson. 2025. From Local to Global: A Graph RAG Approach to Query-Focused Summarization. arXiv:2404.16130 [cs] doi:10.48550/arXiv.2404.16130.

[6] Ikujiro Nonaka and Hirotaka Takeuchi. 1995. The Knowledge-Creating Company: How Japanese Companies Create the Dynamics of Innovation. Oxford University Press.

[7] Etienne Wenger. 1998. Communities of Practice: Learning, Meaning, and Identity. Cambridge University Press.

[8] Amit Joshi, Luis Gonzalez Morales, Szymon Klarman, Armando Stellato, Aaron Helton, Sean Lovell, and Artur Haczek. 2021. A Knowledge Organization System for the United Nations Sustainable Development Goals. In The Semantic Web, Ruben Verborgh, Katja Hose, Heiko Paulheim, Pierre-Antoine Champin, Maria Maleshkova, Oscar Corcho, Petar Ristoski, and Mehwish Alam (Eds.). Vol. 12731. Springer International Publishing, 548–564. doi:10.1007/978-3-030-77385-4_33

[9] Eleni Fotopoulou, Ioanna Mandilara, Anastasios Zafeiropoulos, Chrysi Laspidou, Giannis Adamos, Phoebe Koundouri, and Symeon Papavassiliou. 2022. SustainGraph: A Knowledge Graph for Tracking the Progress and the Interlinking among the Sustainable Development Goals’ Targets. 10 (2022). doi:10.3389/fenvs.2022.1003599

[10] Denny Vrandečić and Markus Krötzsch. 2014. Wikidata: A Free Collaborative Knowledgebase. Commun. ACM 57, 10 (2014), 78–85. doi:10.1145/2629489

[11] Tim Berners-Lee, James Hendler, and Ora Lassila. 2001. The Semantic Web. Scientific American 284, 5 (2001), 34–43. doi:10.1038/scientificamerican0501-34

 [12] Pascal Hitzler. 2021. Towards a New Generation of the Semantic Web. Commun. ACM 64, 12 (2021), 76–83. doi:10.1145/3488009

[13] Bilal Abu-Salih, Salihah Alotaibi, Albandari Lafi Alanazi, Ruba Abu Khurma, Bashar Al-Shboul, Ansar Khouri, and Mohammed Aljaafari. 2025. Using Large Language Models for Semantic Interoperability: A Systematic Literature Review. ICT Express 11, 4 (Aug. 2025), 819–837. doi:10.1016/j.icte.2025.06.011

[14] Vinay K. Chaudhri, Chaitanya Baru, Naren Chittar, Xin Luna Dong, Michael Genesereth, James Hendler, Aditya Kalyanpur, Douglas B. Lenat, Juan Sequeda, Denny Vrandečić, and Kuansan Wang. 2022. Knowledge Graphs: Introduction, History, and Perspectives. AI Magazine 43, 1 (2022), 17–29. doi:10.1002/aaai.12033

[15] Garima Agrawal, Tharindu Kumarage, Zeyad Alghamdi, and Huan Liu. Can Knowledge Graphs Reduce Hallucinations in LLMs? : A Survey. arXiv:2311.07914 [cs] doi:10.48550/arXiv.2311.07914

[16] Jeff Z. Pan, Simon Razniewski, Jan-Christoph Kalo, Sneha Singhania, Jiaoyan Chen, Stefan Dietze, Hajira Jabeen, Janna Omeliyanenko, Wen Zhang, Matteo Lissandrini, Russa Biswas, Gerard de Melo, Angela Bonifati, Edlira Vakaj, Mauro Dragoni, and Damien Graux. 2023. Large Language Models and Knowledge Graphs: Opportunities and Challenges. arXiv:2308.06374 [cs] doi:10.48550/arXiv.2308.06374

[17] Daniel Jurafsky and James H. Martin. 2025. Speech and Language Processing: An Introduction to Natural Language Processing, Computational Linguistics, and Speech Recognition with Language Models (3rd ed.). https://web.stanford.edu/~jurafsky/slp3/ Online manuscript released August 24, 2025.