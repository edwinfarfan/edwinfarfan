package pe.com.cd.repository.search;

import pe.com.cd.domain.Moneda;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Moneda entity.
 */
public interface MonedaSearchRepository extends ElasticsearchRepository<Moneda, Long> {
}
