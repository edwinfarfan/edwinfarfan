package pe.com.cd.repository.search;

import pe.com.cd.domain.Persona;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Persona entity.
 */
public interface PersonaSearchRepository extends ElasticsearchRepository<Persona, Long> {
}
