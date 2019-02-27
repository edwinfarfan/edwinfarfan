package pe.com.cd.repository.search;

import pe.com.cd.domain.TelefonoPersona;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TelefonoPersona entity.
 */
public interface TelefonoPersonaSearchRepository extends ElasticsearchRepository<TelefonoPersona, Long> {
}
