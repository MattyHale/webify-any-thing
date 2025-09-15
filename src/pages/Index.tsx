import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Satellite, Shield, Cog, GitBranch, Scale, Gauge, Bell, CheckCircle } from "lucide-react";

const Index = () => {
  const domains = [
    {
      icon: <Cog className="h-6 w-6" />,
      title: "Infrastructure",
      description: "Core technical architecture underpinning the ingestion, management, and dissemination of EO data"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security",
      description: "Protection of sensitive data and systems through comprehensive security measures"
    },
    {
      icon: <Cog className="h-6 w-6" />,
      title: "Automation",
      description: "Streamlined processes that reduce manual intervention and increase efficiency"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Consistency",
      description: "Standardized approaches ensuring reliable and predictable operations"
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Governance & Compliance",
      description: "Framework for managing operations within regulatory and policy requirements"
    },
    {
      icon: <GitBranch className="h-6 w-6" />,
      title: "Reliability & Resilience",
      description: "Systems designed to maintain operations under various conditions and recover from failures"
    },
    {
      icon: <Gauge className="h-6 w-6" />,
      title: "Scalability & Performance",
      description: "Ability to handle growing data volumes and user demands efficiently"
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Notifications & Event Triggers",
      description: "Real-time communication and automated responses to system events"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Introduction</h2>
            <div className="prose prose-lg text-muted-foreground">
              <p className="mb-6">
                The standard is organized into eight core domains – Infrastructure, Security, Automation, Consistency, Governance & Compliance, Reliability & Resilience, Scalability & Performance, and Notifications & Event Triggers – outlining for each what is expected, why it matters, and the key principles of an effective system. Together, these chapters set the minimum benchmark for any serious EODI serving technical and commercial users.
              </p>
              <p className="mb-6">
                Written in a clear, declarative tone, this standard directly addresses real operational challenges in the EO industry. It calls out common pain points such as fragmented data silos, vendor lock-in, labor-intensive manual workflows, and the difficulties of managing petabyte-scale datasets. Rather than hypothetical solutions, it prescribes practical approaches to overcome these issues.
              </p>
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
              <Card key={index} className="bg-card hover:bg-accent/50 transition-colors">
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
      <section className="py-16">
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

      {/* Footer */}
      <footer className="bg-card py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Earth Observation Data Infrastructure (EODI) Standard
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
