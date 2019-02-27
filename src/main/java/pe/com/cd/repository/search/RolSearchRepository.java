package pe.com.cd.repository.search;

import pe.com.cd.domain.Rol;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Rol entity.
 */
public interface RolSearchRepository extends ElasticsearchRepository<Rol, Long> {
}
