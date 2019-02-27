package pe.com.cd.repository.search;

import pe.com.cd.domain.TransaccionPersona;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TransaccionPersona entity.
 */
public interface TransaccionPersonaSearchRepository extends ElasticsearchRepository<TransaccionPersona, Long> {
}
