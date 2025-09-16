import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Satellite, Shield, Cog, GitBranch, Scale, Gauge, Bell, CheckCircle, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const domains = [{
    icon: <Cog className="h-6 w-6" />,
    title: "Infrastructure",
    description: "Core technical architecture underpinning the ingestion, management, and dissemination of EO data"
  }, {
    icon: <Shield className="h-6 w-6" />,
    title: "Security",
    description: "Protection of sensitive data and systems through comprehensive security measures"
  }, {
    icon: <Cog className="h-6 w-6" />,
    title: "Automation",
    description: "Streamlined processes that reduce manual intervention and increase efficiency"
  }, {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Consistency",
    description: "Standardized approaches ensuring reliable and predictable operations"
  }, {
    icon: <Scale className="h-6 w-6" />,
    title: "Governance & Compliance",
    description: "Framework for managing operations within regulatory and policy requirements"
  }, {
    icon: <GitBranch className="h-6 w-6" />,
    title: "Reliability & Resilience",
    description: "Systems designed to maintain operations under various conditions and recover from failures"
  }, {
    icon: <Gauge className="h-6 w-6" />,
    title: "Scalability & Performance",
    description: "Ability to handle growing data volumes and user demands efficiently"
  }, {
    icon: <Bell className="h-6 w-6" />,
    title: "Notifications & Event Triggers",
    description: "Real-time communication and automated responses to system events"
  }];

  const navigationItems = [
    { id: "infrastructure", title: "Infrastructure" },
    { id: "security", title: "Security" },
    { id: "automation", title: "Automation" },
    { id: "consistency", title: "Consistency" },
    { id: "governance", title: "Governance & Compliance" },
    { id: "reliability", title: "Reliability & Resilience" },
    { id: "scalability", title: "Scalability & Performance" },
    { id: "notifications", title: "Notifications & Event Triggers" }
  ];
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Satellite className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Earth Observation Data Infrastructure (EODI) Standard
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              This document establishes a rigorous standard for Earth Observation Data Infrastructure (EODI), defining the essential capabilities that any credible EO data platform must provide. It emphasizes operational integrity over product-specific features, making clear what a high-functioning EODI shall do to support mission-critical applications.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-card/50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Quick Navigation</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant="outline"
                  size="sm"
                  onClick={() => scrollToSection(item.id)}
                  className="hover:bg-primary hover:text-primary-foreground"
                >
                  {item.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Introduction</h2>
            <div className="prose prose-lg text-muted-foreground">
              <p className="mb-6">
                The standard is organized into eight core domains – Infrastructure, Security, Automation, Consistency, Governance & Compliance, Reliability & Resilience, Scalability & Performance, and Notifications & Event Triggers – outlining for each what is expected, why it matters, and the key principles of an effective system. Together, these chapters set the minimum benchmark for any serious EODI serving technical and commercial users.
              </p>
              <p className="mb-6">This standard directly addresses real operational challenges in the EO industry. It calls out common pain points such as fragmented data silos, vendor lock-in, labor-intensive manual workflows, and the difficulties of managing petabyte-scale datasets. Rather than hypothetical solutions, it prescribes practical approaches to overcome these issues.</p>
              <p>
                The guidance is grounded in proven practices: modular, interoperable architecture; automation and API-first design; robust governance; and scalable, resilient operations. Ultimately, this document is a strategic blueprint for building EO data infrastructures that are modular, scalable, resilient, and user-centric, enabling program operators to focus on extracting insights from data – not struggling with the underlying infrastructure – in a cost-effective and transparent manner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eight Core Domains */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Eight Core Domains</h2>
            <p className="text-lg text-muted-foreground">
              Essential capabilities that any credible EO data platform must provide
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((domain, index) => (
              <Card 
                key={index} 
                className="bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => scrollToSection(navigationItems[index].id)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    {domain.icon}
                  </div>
                  <CardTitle className="text-lg">{domain.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {domain.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section id="infrastructure" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-full">
                <Cog className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">1. Infrastructure</h2>
                <Badge variant="outline" className="mt-2">Core Domain</Badge>
              </div>
            </div>
            
            <div className="prose prose-lg text-muted-foreground mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">What is Expected:</h3>
              <p>
                The EODI's infrastructure is the core technical architecture underpinning the ingestion, management, and dissemination of EO data. It must seamlessly integrate many distributed components, data sources, and partner inputs into a unified whole that behaves as a single high-functioning platform. In practice, this means supporting multi-constellation operations: data from numerous satellite missions and providers are orchestrated under one system so that users experience one cohesive environment.
              </p>
              <p>
                The infrastructure must encompass end-to-end workflows covering everything from initial data acquisition or satellite tasking, through processing and cataloging, to final delivery. It should provide both intuitive, user-centric interfaces and robust programmatic APIs, allowing users to self-service their needs (e.g. discover, order, and retrieve imagery) with minimal manual involvement. In essence, the EODI infrastructure is the backbone that ensures all other aspects (security, automation, etc.) function in concert.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">Key Infrastructure Principles:</h3>
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  <strong>Unified Data Integration:</strong> The EODI must bring together all relevant EO data sources (satellites, sensors, archives) under a common framework. Using a distributed "system of systems" architecture, the platform supports specialized processing for different data types while still presenting a unified interface. In practice this means maintaining a centralized catalog or metadata repository that enables discovery across the entire holdings – for example, NASA's Common Metadata Repository unifies search over all EOSDIS datasets. Users shouldn't need to know which satellite or archive a given dataset came from; the infrastructure abstracts sources into one cohesive data lake. Data from new suppliers or missions can be plugged in without disrupting the overall system, ensuring the platform continuously grows in scope without fragmenting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-full">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">2. Security</h2>
                <Badge variant="outline" className="mt-2">Core Domain</Badge>
              </div>
            </div>
            
            <div className="prose prose-lg text-muted-foreground mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">What is Expected:</h3>
              <p>
                Security is a foundational aspect of any EO data platform – an EODI must safeguard data and operations through robust measures at every layer. This includes controlling access to data and functions (strong authentication and fine-grained authorization), protecting data both in storage and in transit (encryption everywhere), and monitoring for any malicious or inappropriate activity. Security-by-design should be evident throughout the system: from user login and API key management, to network architecture and software development practices. The platform is expected to isolate each customer's data and processing in a multi-tenant environment such that one user cannot accidentally or intentionally access another user's assets. All data must be encrypted end-to-end, meaning it stays encrypted on disk and travels only over secure, encrypted channels. Strong identity management is required (e.g. support for multi-factor authentication, single sign-on integration) along with role-based access controls so that only authorized personnel can reach sensitive datasets or administrative functions. Additionally, the infrastructure must have audit logging and intrusion detection in place to catch and respond to security incidents. Compliance with relevant security standards and best practices (such as the principles of zero-trust architecture and least-privilege access) should be built in from the start.
              </p>
            </div>

            <div className="prose prose-lg text-muted-foreground mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Why It's Important:</h3>
              <p>
                Customers need absolute trust that the platform will protect their valuable and sensitive information. Many EODI users are in government, defense, or commercial sectors where EO imagery and derived products can carry strategic or competitive significance. A security breach compromising imagery (for example, revealing sensitive locations or projects) could have serious consequences. Likewise, a loss or tampering of user data or analytics could undermine missions and erode stakeholder confidence. Strong security, on the other hand, gives clients the confidence to integrate the EODI deeply into their workflows. If the platform meets high security standards (often demonstrated via certifications like ISO 27001 or SOC 2 compliance), users will treat it as a trusted extension of their own infrastructure. Conversely, if security is weak or uncertain, clients will hesitate – they might silo the platform from critical systems or avoid uploading their own data, greatly limiting its usefulness. In summary, without robust security, no amount of functionality will make an EO.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">Key Security Principles:</h3>
              <div className="prose prose-lg text-muted-foreground space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Strong Authentication & Access Control:</h4>
                  <p>
                    All access to the EODI must be gated by reliable authentication and fine-grained authorization. Every user (and service) should verify their identity via strong methods – e.g. passwords combined with MFA, secure tokens, or federated single sign-on – and then only be allowed to perform actions consistent with their role. The platform should enforce the principle of least privilege, meaning each account is granted the minimum permissions necessary for its tasks. For instance, a user from Organization A should never see data belonging to Organization B unless explicitly permitted, and even within one organization an analyst vs. an admin have very different scopes of access. A centralized identity and access management system (integrated with enterprise IAM if applicable) should make it easy for administrators to add/remove users, assign roles, and audit permissions. Every access attempt, whether successful or denied, should be logged for review. In essence, the EODI should ensure that only the right people (or systems) get access to the right data – nothing more.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Encryption & Data Protection:</h4>
                  <p>
                    The platform must employ state-of-the-art encryption to protect data confidentiality and integrity at all times. Data at rest (in databases, object storage, backups, etc.) should be encrypted using strong algorithms, so that even if someone somehow obtains the storage media, the content remains unreadable. Data in transit (moving between services, or from the platform to user devices) must be encrypted via protocols like HTTPS/TLS, so network eavesdropping yields nothing sensitive. Proper encryption key management is critical – keys should be stored securely (e.g. in hardware security modules or dedicated key vaults) with strict control over access, and rotated periodically to reduce exposure. By using encryption universally, an EODI ensures that even if network traffic is intercepted or a storage system is compromised, the actual EO images, metadata, and user information are not exposed to unauthorized parties. Additionally, mechanisms like checksums or digital signatures can be used to detect any data tampering, providing integrity assurance.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Continuous Monitoring & Incident Response:</h4>
                  <p>
                    Security is not "set and forget" – a robust EODI needs active monitoring and a prepared incident response plan. Continuous monitoring means tracking system logs, user behavior, and network traffic for anomalies that could indicate a breach or misuse. For example, if a user account suddenly tries to download an unusually large volume of data or access areas they never have before, it should trigger an alert. The infrastructure should include intrusion detection/prevention systems and automated alerts for suspicious events. Coupled with that, there must be an incident response process in place: if a potential issue is detected, the operations team can contain and investigate it quickly (e.g. disabling a compromised account, patching a vulnerability, notifying affected customers). Regular security audits and penetration tests should also be conducted to probe for weaknesses and ensure defenses keep up with evolving threats. Essentially, the platform should be under vigilant surveillance from a security standpoint, and the organization operating it should be ready to react decisively to any incidents to minimize damage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Section */}
      <section id="automation" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-full">
                <Cog className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">3. Automation</h2>
                <Badge variant="outline" className="mt-2">Core Domain</Badge>
              </div>
            </div>
            
            <div className="prose prose-lg text-muted-foreground mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">What is Expected:</h3>
              <p>
                Automation is at the heart of an effective EO data infrastructure. The platform should take care of repetitive, complex workflows automatically, without requiring manual intervention at each step. An EODI is expected to automate key processes from data acquisition all the way to data delivery. For instance, onboarding a new satellite data stream, updating a geospatial index, generating a derived product (like a mosaic or analysis-ready dataset), or fulfilling a user's imagery order should all be handled by automated pipelines once the initial trigger or request is received. The system must expose programmatic API endpoints for all major functions – searching the catalog, placing orders, retrieving files, etc. – so that users and third-party systems can script and integrate these actions into their own software pipelines. Internally, the platform should follow an event-driven design: when new raw data arrives, it automatically kicks off processing jobs; when processing completes, it automatically moves the output to the next stage or notifies the user. In short, the EODI should function with minimal human babysitting – operators set up the rules, schedules, and processing pipelines, and the infrastructure carries them out consistently and reliably.
              </p>
            </div>

            <div className="prose prose-lg text-muted-foreground mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Why It's Important:</h3>
              <p>
                From an operational perspective, automation translates directly into speed, scalability, and consistency. Users benefit by being able to incorporate the EODI into their workflows seamlessly. For example, a company might set up an automated daily download of the latest satellite images for their region of interest, or trigger an analysis routine whenever a new radar image indicates flooding in their fields. These kinds of near-real-time actions are only feasible if the platform supports end-to-end automation. Without automation, users would be forced to manually check for new data, run processing steps by hand, and distribute results – a slow, error-prone approach that simply doesn't scale when you have hundreds or thousands of new datasets pouring in. Automation also ensures consistency: the same task performed via an automated script or pipeline will execute the same way every time, whereas manual processes are prone to variation or oversight. Moreover, as the demand on the system grows, automated scaling and job management mean the platform can handle more load without needing a linear increase in personnel. In essence, automation makes the EODI a plug-and-play component in a larger ecosystem of tools and enables integration that wouldn't be possible with manual operations. It reduces latency in getting data to decision-makers, reduces labor costs and human error, and allows the infrastructure to be responsive to events and triggers in a way humans simply cannot match. An EODI that isn't heavily automated will struggle to meet modern operational tempos.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">Key Automation Principles:</h3>
              <div className="prose prose-lg text-muted-foreground space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">API-First Design:</h4>
                  <p>
                    Every core capability of the platform should be accessible via an API. In fact, the EODI's own web interface (if it has one) should essentially just be a client of the same public APIs offered to users. This ensures that anything a user can do through the UI can also be done programmatically, which is crucial for integration and scripting. The EODI should provide well-documented RESTful endpoints (and perhaps SDKs for common languages) for tasks such as querying metadata, ordering new imagery collections, retrieving data downloads, and managing user account settings. Clear versioned documentation is part of this principle, so developers know how to build against the platform. Adopting an API-first approach means that automation isn't an afterthought – it's built into the service from the ground up. Users can embed the EODI's functionality into their own applications or workflows easily. For example, an organization could integrate the EODI's APIs into a GIS software or a custom dashboard, or write scripts that periodically query for updates and ingest new data. By not hiding any functionality behind manual-only interfaces, the platform ensures power users and enterprise systems can drive it directly. This also future-proofs the system: as new use cases emerge (e.g. machine-to-machine coordination, IoT devices requesting imagery), an API-driven platform is ready to support them without major redesign.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Workflow Orchestration:</h4>
                  <p>
                    Automated platforms require an orchestration mechanism under the hood to manage complex multi-step workflows. The EODI should include a workflow engine or scheduler that knows how to execute and chain tasks in the right order. For example, consider fulfilling a new image order: the workflow might need to (1) check current catalog holdings, (2) if not available, task a satellite for a new collection, (3) wait for confirmation of capture, (4) ingest the newly received data into the archive, (5) process it to a standard format or product level, and finally (6) deliver a download link to the user and notify them. A built-in orchestrator ensures each of these steps triggers the next one automatically and handles contingencies (e.g. waiting for a satellite pass window or retrying a step on failure). High-functioning EODIs allow administrators to configure these workflows – for instance, inserting a custom processing step or integrating a third-party service – without breaking the automation chain. Orchestration ties together disparate automated tasks into cohesive end-to-end services. By formalizing workflows, the platform makes sure that even complex operations involving multiple systems or dependencies happen reliably and in the correct sequence every time.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Event-Driven Operations:</h4>
                  <p>
                    The EODI should be designed in an event-driven fashion, meaning components communicate and react to events rather than relying solely on periodic checks or manual kicks. When a notable event occurs in the system, it should emit a message or signal that other components can listen for and respond to immediately. For instance, when a new scene is ingested into the catalog, the ingestion service can publish an event like "New Data Available." A processing service subscribed to this event will pick it up and immediately start the necessary processing pipeline on that scene. Likewise, when processing finishes, it can emit a "Product Ready" event that triggers a notification service to inform the user and an indexing service to update the catalog. By using an event-driven architecture (often implemented with message queues or pub/sub systems), the platform reduces latency – things happen as soon as the triggering event occurs, rather than waiting for a scheduled job or a person to notice. It also decouples components, improving scalability and reliability: each service just waits for events it cares about and can be scaled independently. The result is a responsive, real-time infrastructure where data flows to users as fast as possible after it's available, and each part of the system reacts promptly to changes or new information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consistency Section */}
      <section id="consistency" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-full">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">4. Consistency</h2>
                <Badge variant="outline" className="mt-2">Core Domain</Badge>
              </div>
            </div>
            
            <div className="prose prose-lg text-muted-foreground mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">What is Expected:</h3>
              <p>
                Consistency in an EODI means that data and operations behave in a uniform, predictable manner across the entire system. The platform is expected to enforce standardized formats, protocols, and processes for all the data it handles, regardless of source or type. In practical terms, this involves delivering datasets in common, well-documented formats and using a consistent metadata schema for all products. Whether a user is accessing optical imagery from one satellite or radar data from another, they should encounter similar metadata fields (e.g. timestamps, geolocation info, cloud cover percentage) presented in the same structure, and data files that adhere to a common set of conventions (projection, file naming, tiling scheme, packaging, etc.). The infrastructure should include normalization pipelines that automatically convert incoming data into the platform's preferred formats and reference systems. All external interfaces – API responses, download links, coordinate systems – should likewise be consistent. A user shouldn't have to handle special cases or quirks for different collections; the EODI abstracts those differences away by organizing and presenting data systematically. Essentially, once data enters the platform, it should look and act like every other dataset in terms of format and access patterns.
              </p>
            </div>

            <div className="prose prose-lg text-muted-foreground mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Why It's Important:</h3>
              <p>
                Consistency is operationally important because it dramatically reduces the burden on users and lowers the chance of errors. If every dataset came in a different projection or file format, customers would waste time converting and reformatting data before they could even begin analysis – a slow, error-prone process that defeats the purpose of a unified platform. By providing data in a consistent, analysis-ready form, the EODI lets users focus on extracting insights rather than doing data janitorial work. It also means that user-developed software or scripts (say, a routine that detects deforestation or measures crop health) can be written once and then reused across many data types, because the inputs are uniform. Consistency also fosters interoperability and fusion of data: it's much easier to combine information from multiple sources (e.g. overlaying Sentinel-2 optical imagery with Landsat or a commercial SAR dataset) if they "fit together" out of the box. A well-governed, consistent EODI experience builds user trust – when users request data, they know exactly what format and quality to expect every time. This predictability is crucial for planning purposes and for integrating the EODI into automated operational systems (which need stable formats and interfaces). In short, consistency underpins reliability and user confidence in the platform.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">Key Consistency Principles:</h3>
              <div className="prose prose-lg text-muted-foreground space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Standardized Formats & Metadata:</h4>
                  <p>
                    The EODI should adopt community-established standards for data formats and metadata schemas to ensure interoperability. For example, using Cloud-Optimized GeoTIFF (COG) for imagery or netCDF/GeoTIFF for gridded products helps guarantee that files can be readily used by common GIS tools without conversion. On the metadata side, adhering to a schema like the SpatioTemporal Asset Catalog (STAC) for dataset descriptions provides a uniform way to represent key information about each item (like geolocation, timestamp, sensor, etc.). By relying on open standards and specifications, the platform ensures that the data is "Findable, Accessible, Interoperable, and Reusable (FAIR)" to the widest audience. In practice, this means every image might come with a JSON metadata record following the same structure, every raster is delivered in a standard projection with consistent pixel scaling, and common vocabulary is used (e.g. sensor names, product levels) so that metadata is unambiguous. Embracing open standards also future-proofs the system – as the community evolves (new standards or versions), the platform can evolve with it rather than being stuck with proprietary legacy formats.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Normalization Pipelines:</h4>
                  <p>
                    The platform should include automated pipelines that normalize incoming data into the standard forms defined above. Raw EO data from different providers can vary widely – one source might use geographic (lat/long) coordinates, another uses UTM; one provides radiance values, another reflectance; file naming conventions and directory structures differ, and so on. The EODI's ingestion process should handle these variations by reprojecting imagery to the chosen common spatial grid, reformatting files into the standard formats (and converting any proprietary or unusual formats if necessary), and calibrating or converting values to a common scale or unit when possible. Metadata should be translated or mapped to the platform schema (for instance, if an external dataset uses a different field name for acquisition date, it gets mapped to the standard "datetime" field internally). The goal is that after ingestion, all data in the repository adheres to a normalized, platform-wide standard – ready for users to consume without needing custom adjustments per source. Normalization also extends to data quality and preprocessing: for example, the platform might uniformly apply cloud masking to optical imagery or radiometric calibration to radar data, so that users don't have to do these steps separately for each dataset.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Compliance Section */}
      <section id="governance" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-full">
                <Scale className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">5. Governance & Compliance</h2>
                <Badge variant="outline" className="mt-2">Core Domain</Badge>
              </div>
            </div>
            
            <div className="prose prose-lg text-muted-foreground mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">What is Expected:</h3>
              <p>
                Governance and compliance in an EODI context refer to the policies, controls, and oversight that ensure data is managed properly, lawfully, and in line with organizational requirements. An EODI must have strong governance mechanisms to control how data is used and shared, and to comply with all relevant laws, regulations, and contractual obligations associated with that data. This means clearly defining who can access what data and under what conditions – often through a combination of access control rules, data licensing enforcement, and user agreements – and baking those rules into the system's design. It also means managing the data lifecycle (from acquisition to archival or deletion) in a way that meets both operational needs and compliance requirements. For example, the platform might enforce that certain data be deleted or moved to cold storage after a retention period, or ensure that "right to be forgotten" can be honored if any personal data were involved (though EO imagery typically isn't personal data, such considerations may arise in related metadata). The EODI should support robust auditing and reporting capabilities, so that at any time administrators can answer questions like: Who accessed this dataset? Where did this data originate? Has this file been modified or is it the original version? In addition, compliance involves meeting industry and government standards for data handling – for instance, adhering to export control laws (like ITAR for sensitive satellite imagery), privacy laws if applicable, or open data mandates that require certain datasets to be publicly accessible. Governance features ensure the platform operates not just efficiently, but correctly and lawfully.
              </p>
            </div>

            <div className="prose prose-lg text-muted-foreground mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Why It's Important:</h3>
              <p>
                Many EODI customers, especially government agencies and large enterprises, have their own strict compliance requirements. If they use a platform that cannot demonstrate proper governance controls, they may be legally unable or very reluctant to adopt it. For example, a government agency might be required by policy to use systems that log every user data access for accountability; if the EODI lacked audit logging, it would be disqualified. Good governance also prevents misuse of data and protects both the provider and users from legal trouble. Satellite imagery often comes with licenses that restrict how it can be distributed or used – a well-governed EODI will actively enforce those terms (so a user can't accidentally or intentionally violate the license, for instance by sharing data they shouldn't). This protects the provider's agreements and the user from legal liability. Furthermore, strong governance gives organizations confidence that they remain in control of their data even when it's hosted on the platform. For instance, a company will only pipe sensitive analytics results through the EODI if they're sure that only their team (and no one else, not even the platform operator if so configured) can see those results. Finally, in the event of disputes or security incidents – say there's a question of "Who downloaded this confidential image last week?" – having proper governance logs and controls is essential to investigate and take action. Without strong governance, an EODI can descend into chaos: data misuse might go unchecked, accountability becomes impossible, and violations of policy or law can occur unnoticed. That is unacceptable in serious operations, where the stakes are high.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">Key Governance & Compliance Principles:</h3>
              <div className="prose prose-lg text-muted-foreground space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Access Governance & Permissions:</h4>
                  <p>
                    The EODI should implement fine-grained access controls and well-defined permission structures to govern who can access data and functionality. This goes beyond basic login security – governance means specifying, for each dataset or service, exactly which users or groups are allowed, and under what conditions. For example, some datasets might be public (accessible to all logged-in users or even anonymously), others might be restricted to members of a certain organization or project, and some might be private to a single user. The system should support grouping users into roles or teams so that permissions can be managed at scale (e.g. "all analysts in Department X can view Dataset Y"). It should also accommodate approval workflows if needed – for instance, a user could request access to a dataset and an administrator must approve it before the system grants it. Crucially, these rules should align with real-world policies (legal or organizational), and the platform enforces them consistently. Additionally, the platform should facilitate controlled data sharing when appropriate: for example, allowing a user to securely share a specific image or collection with an external partner by granting them a time-limited permission. All such sharing actions must be tracked and revocable. In essence, access governance ensures the right people have the right access at the right time, and that there's an audit trail and oversight for those decisions.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">License Management & Usage Compliance:</h4>
                  <p>
                    Many EO datasets come with licenses or terms of use that restrict how the data can be used, shared, or redistributed. A rigorous EODI will have mechanisms to encode these license rules and enforce them automatically. This could involve tagging data with metadata about its license (e.g. "commercial use only, no redistribution") and then having the platform's logic consult those tags whenever an action is attempted. For instance, if a license forbids exporting data outside of certain countries, the platform could check a user's nationality or location before allowing download, or simply block such actions and inform the user of the restriction. If a license allows usage for a limited time (say one year), the system might automatically revoke access after that period or require renewal. The platform should also clearly present license information to users – transparency in what they can and cannot do with the data is part of user education and compliance. By automating license compliance, the EODI prevents unintentional misuse (which could lead to legal disputes or penalties). It should make following the rules the path of least resistance for users. This protects both the data providers' rights and the users from accidentally violating agreements. In sum, the platform must treat license terms as enforceable rules, not just fine print.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Auditing & Accountability:</h4>
                  <p>
                    A high-functioning EODI keeps detailed audit logs of all significant actions and provides tools to review them. Governance requires that if needed, one can reconstruct the history of a dataset (its provenance and every access or change) and the history of user actions. For example, the system should be able to log that User A downloaded Image 123 on 2025-09-01 14:30, or Analyst B shared Dataset XYZ with User C via a platform feature on 2025-09-02. These logs should be tamper-evident (so no one can alter them to cover their tracks) and secured in storage. The platform should provide administrators with interfaces or reports to query the logs and even set up automated alerts for unusual events (like a user downloading an abnormally large volume of data in a short time, which could indicate misuse). This level of auditing is often necessary for formal compliance audits and gives organizations confidence that there is oversight. It also deters improper behavior – when users know that everything is logged and attributable, they are more likely to follow proper procedures. From an operational standpoint, logs are invaluable for investigating incidents (security breaches, data leaks) or even just generating usage statistics for internal reporting or billing. In summary, accountability is enforced by knowing that actions within the platform are tracked and reviewable. This not only helps in governance and compliance but also in optimizing and understanding system usage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reliability & Resilience Section */}
      <section id="reliability" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-full">
                <GitBranch className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">6. Reliability & Resilience</h2>
                <Badge variant="outline" className="mt-2">Core Domain</Badge>
              </div>
            </div>
            
            <div className="prose prose-lg text-muted-foreground mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">What is Expected:</h3>
              <p>
                Reliability and resilience refer to the platform's ability to function continuously, deliver consistent performance, and recover gracefully from problems or disruptions. An EODI should be highly reliable: it must have minimal unplanned downtime, quick response times, and generally be dependable for users who might rely on it around the clock. This involves engineering out single points of failure by using redundant components (multiple servers, clusters for databases, etc.) so that if one part fails, the service as a whole stays up. It also means implementing robust monitoring and alerting so that any degradation is detected and addressed before it becomes a major outage. Resilience goes hand-in-hand, emphasizing the platform's ability to absorb and adapt to unexpected events – whether it's a sudden surge in usage, a hardware failure, or even a larger-scale disaster like an entire data center going offline. A resilient EODI might be deployed in multiple geographic regions or availability zones, so that if one region suffers an outage, another can take over serving users. Data should be stored with replication and backups such that a loss or corruption in one copy does not result in permanent data loss. In summary, the infrastructure should be built to expect the unexpected – it continues operating through faults, overloads, and incidents, and when things do go wrong, it fails gracefully and recovers as quickly as possible.
              </p>
            </div>

            <div className="prose prose-lg text-muted-foreground mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Why It's Important:</h3>
              <p>
                Many users embed the EODI deeply into time-sensitive workflows. For example, disaster response teams may depend on the platform to deliver imagery in the aftermath of a hurricane or earthquake – if the platform is down or slow at that critical moment, it could delay aid and have real humanitarian consequences. Similarly, an agribusiness might rely on automated data feeds during a critical crop growing period; an outage could mean missing a narrow window to intervene (e.g. irrigation or pest control based on imagery). Even in less urgent contexts, organizations build processes and tools around the assumption that the data infrastructure will be there when needed. If the EODI frequently fails to deliver or has chronic performance issues, users will lose confidence and may need to build costly backup solutions or revert to less efficient methods (undermining the value of the platform entirely). On the flip side, an EODI that successfully weathers incidents and is transparent in communicating issues will earn a reputation as a mature, reliable service suitable for critical operations. Trust is key: users entrust not only their data but often their mission outcomes to the platform. A single major data loss or a prolonged outage can irreparably damage that trust. Therefore, reliability (steady day-to-day operation) and resilience (handling the "bad days" gracefully) are both essential.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">Key Reliability & Resilience Principles:</h3>
              <div className="prose prose-lg text-muted-foreground space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">High-Availability Architecture:</h4>
                  <p>
                    The system should be designed for high availability, meaning it can continue functioning even when certain components fail. This typically involves redundancy at every critical layer. For example, run multiple instances of each service (in a load-balanced configuration) so that if one instance crashes or is taken down for maintenance, others seamlessly pick up the traffic. Use clustered or replicated databases such that if the primary database goes down, a replica can take over with up-to-date data. Network paths should be redundant as well, avoiding single network switches or links that could cut off users. In cloud deployments, this might mean spreading infrastructure across multiple availability zones (isolated data centers) so that a zone outage doesn't bring everything down. High availability also implies being able to do maintenance without full downtime – techniques like rolling updates (upgrading servers one by one while traffic is routed to the rest) should be employed. The platform should have an uptime target (e.g. 99.9% or higher) and measure itself against it, with any downtime being a rare and notable event. In practice, if any one server or component fails, users should either not notice any disruption at all, or at worst experience a very brief hiccup while a failover occurs. Designing for HA requires careful planning, but it pays off by making the service robust against everyday issues like hardware faults or software crashes.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Data Redundancy & Backups:</h4>
                  <p>
                    All important data within the EODI (raw imagery, processed products, metadata catalogs, user-generated content, etc.) must be stored with redundancy and regularly backed up. Redundancy means having multiple copies of data in independent systems so that the failure of one copy doesn't result in data loss. For example, using distributed storage that automatically keeps, say, three replicas of each file on different nodes; or replicating a database across a primary and secondary; or using multi-zone or multi-region storage services. If a disk dies or a server goes offline, the data should still be accessible from another replica. Backups go a step further to protect against issues like accidental deletion or widespread corruption. Regular snapshots or backup exports of key databases and file stores should be taken and stored in a secure, separate location (possibly even offline or in a different cloud provider for maximum resilience). The platform should have a well-defined disaster recovery plan: if a truly catastrophic event happened (imagine a fire in a data center that destroys multiple systems), there is a documented procedure to restore services and data from backups within a known acceptable timeframe. Importantly, these backups and failovers should be tested periodically (you don't want to discover your backups were incomplete only after a disaster strikes). By prioritizing data durability, the EODI ensures that user data won't be permanently lost, even under unlikely worst-case scenarios.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Monitoring & Alerting:</h4>
                  <p>
                    A reliable platform comes with comprehensive monitoring of its components and a proactive alerting system. All critical metrics – server health (CPU, memory), storage usage, database query performance, queue lengths, error rates, etc. – should be continuously measured. If any metric goes beyond a healthy threshold (say, response times start climbing, or disk space is 90% full, or error rates spike), the monitoring system should immediately alert the operations team (and in some cases, automated remediation scripts). Modern monitoring might include not just raw metrics, but also synthetic transactions (regularly testing the system from a user's perspective) and even predictive analytics to catch trends (like memory usage creeping up over days indicating a memory leak). Alerts should be prioritized by severity and tied into on-call schedules so that critical issues get human attention 24/7. Additionally, it's good practice to expose some of this status information to users via a status dashboard or API. Operational transparency – e.g. showing "all systems green" or "we're investigating an issue with ordering service" – helps manage user expectations and trust. When users know that the platform team is actively monitoring and communicating status, they can plan around any issues and feel confident in the service. In short, monitoring and alerting turn random failures into managed incidents: instead of users discovering problems, the platform team typically knows first and is already working on a fix or mitigation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scalability & Performance Section */}
      <section id="scalability" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-full">
                <Gauge className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">7. Scalability & Performance</h2>
                <Badge variant="outline" className="mt-2">Core Domain</Badge>
              </div>
            </div>
            
            <div className="prose prose-lg text-muted-foreground mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">What is Expected:</h3>
              <p>
                Scalability and performance are about the platform's capacity to handle growth and to provide fast, efficient service under load. An EODI must be designed to scale along multiple dimensions – data volume, number of users, and computational demand – without degradation of performance. As Earth observation missions proliferate, the amount of data can be enormous. For perspective, over 500 EO satellites have been launched in the past few decades and dozens more are launched each year, leading to exponential growth in data generation. A single program like ESA's Sentinel can produce tens of millions of data products (Sentinel-2 alone has delivered 50+ million downloads totaling ~41 petabytes). A modern EO platform should be ready to accommodate such scales by scaling storage and processing resources seamlessly. Similarly, if the user base grows from 10 to 10,000 concurrent users, the system should be able to "scale out" by adding computing resources and balancing load so that each user still experiences snappy performance. In essence, the architecture must ensure that current performance levels can be maintained (or even improved) as the system scales to much larger workloads in the future. Performance means that under normal loads, data queries return quickly and throughput for data downloads is high; under peak loads, the system adapts so that it remains responsive instead of choking. Users should experience minimal wait times for searches and downloads, even if the backend is crunching through billions of records or heavy processing tasks. The EODI should be engineered with the expectation that today's dataset might be a terabyte, but tomorrow's could be a petabyte – and the system should handle both gracefully.
              </p>
            </div>

            <div className="prose prose-lg text-muted-foreground mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Why It's Important:</h3>
              <p>
                Scalability and performance determine whether the EODI can keep up with evolving user demands and the ever-growing supply of data. If the platform cannot scale, it will become progressively slower or more unstable as more data accumulates or more users join, undermining any benefits it provides. Users often embark on long-term projects or build solutions on top of these platforms, so they need confidence that as their needs grow (more areas of interest, higher resolution data, more frequent updates), the infrastructure will meet the challenge. High performance also directly impacts user productivity and mission outcomes: analysts can iterate faster on algorithms if data retrieval is swift, emergency responders can get critical information in real-time if the system isn't bogged down, and decision-makers can outpace competitors if they get insights minutes or hours sooner thanks to a fast platform. In commercial contexts, if your platform delivers results faster and scales with client needs, it becomes a competitive advantage for your users (and thus for the platform itself).
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">Key Scalability & Performance Principles:</h3>
              <div className="prose prose-lg text-muted-foreground space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Elastic Resource Scaling:</h4>
                  <p>
                    The platform should utilize an elastic architecture, typically leveraging cloud infrastructure, to dynamically adjust computing and storage resources according to demand. When workload increases – say, a spike in concurrent users or a large processing job kicks off – the EODI can automatically provision additional computing power, memory, or network capacity to maintain responsive performance. Conversely, during off-peak times, it scales resources down to avoid waste. Technologies like container orchestration (e.g. Kubernetes) or serverless frameworks can be used to add more service instances on the fly when needed. On the storage side, using distributed object storage or scalable file systems ensures there isn't a hard limit that gets hit as datasets grow; instead, storage can expand by adding more nodes or buckets. The key is that scaling out (adding more parallel resources) or scaling up (using more powerful resources) does not require major redesign or downtime – it's built into the system's design from the start. This elasticity means a sudden surge in usage (perhaps due to a breaking news event where everyone wants satellite imagery of a location) doesn't crash the system – it just grows to handle the load. Similarly, long-term growth in data volume or user base can be accommodated by incrementally increasing capacity, rather than periodically replacing the whole system. Elastic scaling also ties into cost efficiency, as the platform can run with an optimal footprint and only "burst" larger when needed, rather than over-provisioning at all times.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Optimized Data Indexing & Retrieval:</h4>
                  <p>
                    To maintain performance with large data volumes, the EODI must implement efficient indexing and query mechanisms specifically tailored to geospatial-temporal data. This means using spatial indices (such as R-trees, quad-trees, or geohash-based indexing) for location-based queries, and temporal indices for time-based queries. Metadata about each dataset (e.g. acquisition date, location bounding box, sensor type, cloud cover, etc.) should be stored in databases that are optimized for search and filtering, so that even if there are billions of records, a query like "find all images from 2024 over this 50 km² area with less than 10% cloud cover" can return results in seconds. Caching strategies are also crucial: the platform should cache frequently accessed metadata queries or popular data products so repeat accesses are faster. On the data delivery side, using formats that are cloud-optimized (like COGs for imagery) allows for partial retrieval – a user downloading just a tile or spectral band doesn't have to download the entire file. The platform might integrate a Content Delivery Network for very popular datasets to distribute load and reduce latency globally. All these techniques serve one goal: when a user asks for data, the system finds it and delivers it as fast as possible. Continual tuning – such as adding database indices for new query patterns or compacting metadata – is part of this principle, ensuring that the search speed and download throughput remain high as the data archive scales up.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Parallel & Distributed Processing:</h4>
                  <p>
                    Large-scale EO tasks (for example, generating a global mosaic from thousands of images, or analyzing a 10-year time series of imagery for change detection) are computationally intensive and data-heavy. A scalable EODI should be able to distribute such processing across multiple processors or machines to get results faster. This might involve using big data processing frameworks or cluster computing (like Apache Spark, Dask, or even HPC setups) for analytics, and dividing large jobs into smaller tasks that run in parallel. For instance, a global image mosaic could be split by regions – each region processed on a different node simultaneously – and then combined. The platform could automatically detect embarrassingly parallel tasks (like applying the same algorithm to 10,000 images) and farm them out to 10, 50, or 100 worker nodes to execute in parallel, rather than one after the other. Likewise, ingesting or reprocessing a massive dataset can be parallelized by chunk. Embracing parallelism ensures that performance can scale roughly linearly with the resources added: processing 1000 images can be nearly as quick as 100 images if you throw 10× the resources at it, assuming the software is designed to scale. This is critical for timely results as data volumes explode. Users should feel that the platform is leveraging "all available firepower" to deliver results quickly – which is especially important for time-sensitive applications. It also means the platform won't become unusably slow for large tasks; instead, it intelligently uses more infrastructure to keep execution times reasonable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notifications & Event Triggers Section */}
      <section id="notifications" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-full">
                <Bell className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">8. Notifications & Event Triggers</h2>
                <Badge variant="outline" className="mt-2">Core Domain</Badge>
              </div>
            </div>
            
            <div className="prose prose-lg text-muted-foreground mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">What is Expected:</h3>
              <p>
                Notifications and event triggers refer to the platform's capability to actively inform users or external systems about important events, rather than expecting users to continuously poll or check for updates. An EODI should have a robust notification subsystem that can alert users when certain conditions are met – for example, when a requested image is ready for download, when new data that matches a user's interest has been added to the catalog, or when a processing job they submitted is complete. These notifications can take various forms (and the system should be flexible in supporting multiple channels): email alerts, SMS/text messages, push notifications in a web or mobile app, or machine-readable callbacks such as HTTP POSTs to a user's webhook endpoint. Alongside notifications, the platform should allow users to set up custom event triggers or subscriptions. This means a user can express interest in a certain type of event (e.g. "notify me whenever there's new Sentinel-2 imagery over this coordinates bounding box" or "trigger my external script whenever an analytic result for region X is generated"). In short, the EODI shouldn't be a passive data repository that users have to constantly poll; it should be an active participant that pushes relevant information out and can initiate workflows in real-time.
              </p>
            </div>

            <div className="prose prose-lg text-muted-foreground mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Why It's Important:</h3>
              <p>
                This capability significantly improves efficiency and responsiveness for users. In many EO applications, timeliness is crucial. Consider disaster response: responders need to know as soon as new satellite imagery of the affected area becomes available. A notification system that pings them (or their application) immediately when data is ready means analysis and decision-making can start hours sooner than if someone had to manually keep checking. Similarly, in monitoring scenarios (agriculture, forestry, security, etc.), users often care about certain thresholds or events – e.g., a drop in a vegetation index, or detection of a change in an area – and having the platform trigger an alert at that moment turns the EODI into an early warning system. Event triggers also enable automation loops: for instance, a notification about new data availability can automatically kick off a user's own processing pipeline or update a dashboard (since the notification can be tied to a machine process). Without notifications, users either waste effort constantly checking the platform (and possibly missing things if they check too infrequently), or they introduce custom polling code that still adds delay and load. By providing a built-in notification and trigger framework, the EODI makes itself proactive and real-time, which is often a requirement for modern operational use-cases. It effectively closes the loop.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">Key Notifications & Event Triggers Principles:</h3>
              <div className="prose prose-lg text-muted-foreground space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Real-Time Data Alerts:</h4>
                  <p>
                    The platform should deliver notifications as close to real-time as feasible when events occur. For example, if a new scene is ingested into the catalog that matches a user's subscription criteria (such as imagery over their area of interest), the system should generate and send out a notification within minutes or even seconds. Achieving this might involve the ingestion pipeline publishing an event to a message broker the moment data is available, and the notification service picking it up immediately. The EODI should support multiple notification channels: Email (suitable for human-readable alerts and less urgent notifications), SMS or messaging apps (for urgent, short alerts that might be needed in the field), and Webhooks/APIs (for machine-to-machine alerts, where the platform calls an endpoint the user provided). Users should be able to configure their preferred channels and maybe even the format (for instance, JSON payload for webhooks including details about the event). The underlying principle is immediacy – reduce the latency between something happening in the system and the user being aware of it to near zero. The notifications themselves should carry enough information for the user or their system to act on them directly (e.g. include a link to download the new data or an identifier for the event). If real-time isn't possible due to some external factor, the platform should still aim for promptness and predictability (e.g. batched hourly notifications as a fallback), but real-time is the ideal target.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">User-Defined Subscriptions & Filters:</h4>
                  <p>
                    Users must have the ability to define what events they care about and filter out the noise. The EODI should provide a mechanism for users to create subscriptions or watches on certain criteria. For example, a user might subscribe to "new data over Region Y from Sensor Z" or "any imagery added for country X after date D" or even "notify me when my specific processing job/job type is finished". This could be provided via a simple UI (e.g. saving a search query as a subscription) or via APIs (POST a subscription with certain query parameters). An illustrative real-world example is NASA's Earthdata system, which allows users to save search criteria and will notify them when new data meeting those criteria appear. The platform should allow similar flexibility: essentially letting users register a standing query or event condition that the system will continuously evaluate in the background. Beyond data availability, triggers could also cover system events relevant to the user (such as "my requested order has been processed" or "the collection I'm interested in has been updated with a new version"). The configuration of triggers should allow setting frequency or digest options (maybe a user wants immediate per-item alerts for critical events, but a daily summary email for less critical ones). By empowering users to tailor notifications to their needs, the platform avoids spamming them with everything and ensures they do get alerted for the things that matter to them.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Integration with External Systems:</h4>
                  <p>
                    Notifications and triggers should seamlessly integrate with external systems and workflows, effectively allowing the EODI to be part of a larger automated ecosystem. The platform should provide features like webhooks, where a user can supply a URL (e.g. an endpoint on their own server or cloud function) and the EODI will send an HTTP POST or PUT to that URL whenever the specified event occurs. This way, the user's IT system can automatically ingest the notification and take further action – for example, directly download the new data, kick off an analysis job, or update a GIS dashboard. Support for standard messaging protocols (like MQTT, AMQP, or even AWS SNS/SQS if integrating with AWS environments) can be valuable for machine-to-machine communication, especially in high-frequency scenarios. The idea is that the EODI's events can plug into whatever workflow toolchain the user has. Many organizations will have an existing pipeline (like a geospatial data lake or an analysis system) – the EODI should offer a straightforward way to feed events into those, without human intervention. For instance, a farming company might register a webhook so that when the EODI posts "new image available" for their fields, their script automatically fetches it, runs a crop health algorithm, and then their internal app displays the updated health map – all automatically. The platform should facilitate this sort of end-to-end integration by making notifications developer-friendly and reliable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Earth Observation Data Infrastructure (EODI) Standard
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 shadow-lg"
          size="icon"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </div>;
};
export default Index;