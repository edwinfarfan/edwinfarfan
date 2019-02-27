package pe.com.cd.repository.search;

import pe.com.cd.domain.Permiso;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Permiso entity.
 */
public interface PermisoSearchRepository extends ElasticsearchRepository<Permiso, Long> {
}
