package pe.com.cd.repository.search;

import pe.com.cd.domain.TipoCambio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TipoCambio entity.
 */
public interface TipoCambioSearchRepository extends ElasticsearchRepository<TipoCambio, Long> {
}
