package pe.com.cd.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DepositoCambista.
 */
@Entity
@Table(name = "deposito_cambista")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "depositocambista")
public class DepositoCambista implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_deposito")
    private String numeroDeposito;

    @Column(name = "monto", precision = 10, scale = 2)
    private BigDecimal monto;

    @Lob
    @Column(name = "constancia_adjunto")
    private byte[] constanciaAdjunto;

    @Column(name = "constancia_adjunto_content_type")
    private String constanciaAdjuntoContentType;

    @Column(name = "fecha")
    private LocalDate fecha;

    @Column(name = "estado")
    private String estado;

    @OneToOne
    @JoinColumn(unique = true)
    private Usuario usuario;

    @OneToOne
    @JoinColumn(unique = true)
    private Banco banco;

    @OneToOne
    @JoinColumn(unique = true)
    private Moneda moneda;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroDeposito() {
        return numeroDeposito;
    }

    public DepositoCambista numeroDeposito(String numeroDeposito) {
        this.numeroDeposito = numeroDeposito;
        return this;
    }

    public void setNumeroDeposito(String numeroDeposito) {
        this.numeroDeposito = numeroDeposito;
    }

    public BigDecimal getMonto() {
        return monto;
    }

    public DepositoCambista monto(BigDecimal monto) {
        this.monto = monto;
        return this;
    }

    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }

    public byte[] getConstanciaAdjunto() {
        return constanciaAdjunto;
    }

    public DepositoCambista constanciaAdjunto(byte[] constanciaAdjunto) {
        this.constanciaAdjunto = constanciaAdjunto;
        return this;
    }

    public void setConstanciaAdjunto(byte[] constanciaAdjunto) {
        this.constanciaAdjunto = constanciaAdjunto;
    }

    public String getConstanciaAdjuntoContentType() {
        return constanciaAdjuntoContentType;
    }

    public DepositoCambista constanciaAdjuntoContentType(String constanciaAdjuntoContentType) {
        this.constanciaAdjuntoContentType = constanciaAdjuntoContentType;
        return this;
    }

    public void setConstanciaAdjuntoContentType(String constanciaAdjuntoContentType) {
        this.constanciaAdjuntoContentType = constanciaAdjuntoContentType;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public DepositoCambista fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getEstado() {
        return estado;
    }

    public DepositoCambista estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public DepositoCambista usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Banco getBanco() {
        return banco;
    }

    public DepositoCambista banco(Banco banco) {
        this.banco = banco;
        return this;
    }

    public void setBanco(Banco banco) {
        this.banco = banco;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public DepositoCambista moneda(Moneda moneda) {
        this.moneda = moneda;
        return this;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DepositoCambista depositoCambista = (DepositoCambista) o;
        if (depositoCambista.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), depositoCambista.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DepositoCambista{" +
            "id=" + getId() +
            ", numeroDeposito='" + getNumeroDeposito() + "'" +
            ", monto=" + getMonto() +
            ", constanciaAdjunto='" + getConstanciaAdjunto() + "'" +
            ", constanciaAdjuntoContentType='" + getConstanciaAdjuntoContentType() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
