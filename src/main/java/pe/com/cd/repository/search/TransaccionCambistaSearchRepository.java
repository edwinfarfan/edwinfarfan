package pe.com.cd.repository.search;

import pe.com.cd.domain.TransaccionCambista;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TransaccionCambista entity.
 */
public interface TransaccionCambistaSearchRepository extends ElasticsearchRepository<TransaccionCambista, Long> {
}
