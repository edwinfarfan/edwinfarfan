package pe.com.cd.repository.search;

import pe.com.cd.domain.UsuarioRol;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the UsuarioRol entity.
 */
public interface UsuarioRolSearchRepository extends ElasticsearchRepository<UsuarioRol, Long> {
}
