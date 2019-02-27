package pe.com.cd.repository.search;

import pe.com.cd.domain.DepositoCambista;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DepositoCambista entity.
 */
public interface DepositoCambistaSearchRepository extends ElasticsearchRepository<DepositoCambista, Long> {
}
