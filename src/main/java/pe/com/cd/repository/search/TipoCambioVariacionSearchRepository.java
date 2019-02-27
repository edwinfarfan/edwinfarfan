package pe.com.cd.repository.search;

import pe.com.cd.domain.TipoCambioVariacion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TipoCambioVariacion entity.
 */
public interface TipoCambioVariacionSearchRepository extends ElasticsearchRepository<TipoCambioVariacion, Long> {
}
