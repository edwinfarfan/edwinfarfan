package pe.com.cd.repository.search;

import pe.com.cd.domain.DepositoPersona;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DepositoPersona entity.
 */
public interface DepositoPersonaSearchRepository extends ElasticsearchRepository<DepositoPersona, Long> {
}
