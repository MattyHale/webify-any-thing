import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Satellite, Shield, Users, Database, ArrowRight } from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Satellite className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">EODI</span>
            </div>
            <Button variant="outline" asChild>
              <a href="/">Back to Standard</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Blog Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Blog Title */}
            <header className="mb-12 text-center">
              <Badge variant="outline" className="mb-4">Guide</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                What is Earth Observation Data Infrastructure (EODI)?
              </h1>
              <p className="text-lg text-muted-foreground">
                Published on January 2025
              </p>
            </header>

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Introduction</h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">
                  Earth Observation Data Infrastructure (EODI) is the foundation for managing, automating, and scaling satellite imagery and geospatial data operations. It provides the technical backbone that enables organisations to store, process, and deliver satellite data efficiently and reliably.
                </p>
                <p>
                  This article explains what EODI is, why it matters for modern organisations, and how it's transforming industries from defence to environmental monitoring.
                </p>
              </div>
            </section>

            {/* Why it matters */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Why EODI Matters</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong>Eliminates data silos</strong> by creating unified access to satellite imagery from multiple constellations and providers
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong>Reduces operational costs</strong> through automation, standardisation, and elimination of manual data processing workflows
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong>Enables enterprise scalability</strong> for mining companies monitoring tailings, governments tracking environmental changes, and defence agencies maintaining situational awareness
                  </p>
                </div>
              </div>
            </section>

            {/* Key Features */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-8">Key EODI Capabilities</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Data Normalisation & Standards</h3>
                  <p className="text-muted-foreground mb-4">
                    EODI transforms diverse satellite data formats into standardised, interoperable formats using STAC and OGC standards.
                  </p>
                  <div className="bg-card p-4 rounded-lg">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Automatic metadata extraction and cataloguing</li>
                      <li>• Cloud-optimised GeoTIFF (COG) conversion</li>
                      <li>• STAC-compliant asset organisation</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Automation & Workflow Orchestration</h3>
                  <p className="text-muted-foreground mb-4">
                    Automated pipelines handle everything from data ingestion to processing and delivery, reducing manual intervention by up to 90%.
                  </p>
                  <div className="bg-card p-4 rounded-lg">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Event-driven processing workflows</li>
                      <li>• Constellation orchestration and tasking</li>
                      <li>• Automated quality control and validation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Use Cases */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-8">Industry Use Cases</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Shield className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Defence & Government</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Compliance with security standards, mission readiness, and situational awareness through automated intelligence workflows.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Database className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Mining & Energy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Tailings monitoring, environmental compliance, ESG reporting, and asset monitoring across global operations.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Satellite className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Environment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Wildfire detection, deforestation tracking, climate resilience planning, and ecosystem monitoring at scale.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    What is Earth Observation Data Infrastructure?
                  </h3>
                  <p className="text-muted-foreground">
                    EODI is a comprehensive platform that manages the entire lifecycle of satellite imagery and geospatial data. It handles data ingestion, processing, storage, and delivery while ensuring security, scalability, and compliance with industry standards.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    How does EODI work?
                  </h3>
                  <div className="text-muted-foreground space-y-2">
                    <p><strong>1. Data Ingestion:</strong> Automatically collects data from multiple satellite constellations</p>
                    <p><strong>2. Processing:</strong> Applies standardisation, quality control, and format conversion</p>
                    <p><strong>3. Cataloguing:</strong> Creates searchable metadata using STAC standards</p>
                    <p><strong>4. Delivery:</strong> Provides APIs and interfaces for data access and analysis</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Why is EODI different from traditional GIS platforms?
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-3 text-left">Feature</th>
                          <th className="border border-border p-3 text-left">Traditional GIS</th>
                          <th className="border border-border p-3 text-left">EODI</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr>
                          <td className="border border-border p-3 font-medium">Data Sources</td>
                          <td className="border border-border p-3">Limited, manual import</td>
                          <td className="border border-border p-3">Multi-constellation, automated</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">Processing</td>
                          <td className="border border-border p-3">Manual workflows</td>
                          <td className="border border-border p-3">Automated pipelines</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">Scalability</td>
                          <td className="border border-border p-3">Desktop/server limits</td>
                          <td className="border border-border p-3">Cloud-native, petabyte scale</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Conclusion</h2>
              <div className="prose prose-lg text-muted-foreground mb-8">
                <p>
                  Earth Observation Data Infrastructure represents the next evolution in geospatial technology, moving beyond traditional GIS to provide enterprise-grade automation, standardisation, and scalability. By implementing EODI principles, organisations can transform their satellite data operations from manual, fragmented processes into streamlined, automated systems that deliver consistent value at scale.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <a href="/">
                    Read the EODI Standard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/contact">Request Demo</a>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Blog;