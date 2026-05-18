/** A service application with its granted OAuth scopes */
export interface ServiceApplication {
  /** Application identifier */
  id: string;
  /** List of OAuth permission scopes granted to this application */
  scopes: string[];
}

/** A collection of service applications */
export interface ServiceApplicationsList {
  applications: ServiceApplication[];
}
