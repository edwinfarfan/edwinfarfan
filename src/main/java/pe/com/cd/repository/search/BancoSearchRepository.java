package pe.com.cd.repository.search;

import pe.com.cd.domain.Banco;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Banco entity.
 */
public interface BancoSearchRepository extends ElasticsearchRepository<Banco, Long> {
}
