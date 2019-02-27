package pe.com.cd.repository.search;

import pe.com.cd.domain.DireccionPersona;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DireccionPersona entity.
 */
public interface DireccionPersonaSearchRepository extends ElasticsearchRepository<DireccionPersona, Long> {
}
