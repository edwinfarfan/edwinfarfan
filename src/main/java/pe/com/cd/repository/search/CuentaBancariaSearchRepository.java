package pe.com.cd.repository.search;

import pe.com.cd.domain.CuentaBancaria;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CuentaBancaria entity.
 */
public interface CuentaBancariaSearchRepository extends ElasticsearchRepository<CuentaBancaria, Long> {
}
