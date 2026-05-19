// Interactive Functions

// Layer Detail Display
const layerDetails = {
    7: {
        name: "Application Layer",
        description: "Layer terdekat dengan user. Menyediakan interface untuk aplikasi jaringan.",
        protocols: ["HTTP", "FTP", "SMTP", "DNS"],
        example: "Browser mengakses website, Email client mengirim pesan"
    },
    6: {
        name: "Presentation Layer",
        description: "Menerjemahkan, mengenkripsi, dan mengompresi data.",
        protocols: ["SSL/TLS", "JPEG", "MPEG", "ASCII"],
        example: "Enkripsi HTTPS, Kompresi file ZIP"
    },
    5: {
        name: "Session Layer",
        description: "Mengelola sesi komunikasi antar aplikasi.",
        protocols: ["NetBIOS", "RPC", "PPTP"],
        example: "Login session, Video conference call"
    },
    4: {
        name: "Transport Layer",
        description: "End-to-end delivery, flow control, error recovery.",
        protocols: ["TCP", "UDP"],
        example: "TCP untuk download file, UDP untuk video streaming"
    },
    3: {
        name: "Network Layer",
        description: "Logical addressing dan routing paket data.",
        protocols: ["IP", "ICMP", "IGMP", "Router"],
        example: "Routing paket dari kampus ke server Google"
    },
    2: {
        name: "Data Link Layer",
        description: "Physical addressing dan error detection.",
        protocols: ["Ethernet", "Wi-Fi (802.11)", "Switch"],
        example: "Switch meneruskan frame berdasarkan MAC address"
    },
    1: {
        name: "Physical Layer",
        description: "Transmisi bit mentah melalui media fisik.",
        protocols: ["UTP", "Fiber Optic", "Radio Wave"],
        example: "Sinyal listrik di kabel, gelombang radio Wi-Fi"
    }
};

function showLayerDetail(layerNum) {
    const detail = layerDetails[layerNum];
    const detailDiv = document.getElementById('layerDetail');
    
    detailDiv.innerHTML = `
        <h4>Layer ${layerNum}: ${detail.name}</h4>
        <p><strong>Deskripsi:</strong> ${detail.description}</p>
        <p><strong>Protokol:</strong> ${detail.protocols.join(', ')}</p>
        <p><strong>Contoh:</strong> ${detail.example}</p>
    `;
    
    // Highlight selected layer
    document.querySelectorAll('.osi-layer').forEach(layer => {
        layer.style.opacity = '0.6';
    });
    document.querySelector(`.osi-layer[data-layer="${layerNum}"]`).style.opacity = '1';
}

// Encapsulation Animation
function startEncapsulation() {
    const steps = [
        { layer: 'Application', data: 'Data: "Halo"', color: '#e74c3c' },
        { layer: 'Transport', data: '+ TCP Header = Segment', color: '#f39c12' },
        { layer: 'Network', data: '+ IP Header = Packet', color: '#9b59b6' },
        { layer: 'Data Link', data: '+ MAC Header = Frame', color: '#3498db' },
        { layer: 'Physical', data: 'Bit: 10110011...', color: '#27ae60' }
    ];
    
    const container = document.getElementById('encapsulationSteps');
    container.innerHTML = '';
    
    let delay = 0;
    steps.forEach((step, index) => {
        setTimeout(() => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'encap-step';
            stepDiv.style.cssText = `
                background: ${step.color};
                color: white;
                padding: 1rem;
                margin: 0.5rem 0;
                border-radius: 8px;
                animation: fadeIn 0.5s ease;
            `;
            stepDiv.innerHTML = `<strong>Layer ${index + 1} (${step.layer}):</strong> ${step.data}`;
            container.appendChild(stepDiv);
        }, delay);
        delay += 1000;
    });
}

// TCP Handshake Simulation
function simulateHandshake() {
    const container = document.getElementById('handshakeAnimation');
    container.innerHTML = '';
    
    const steps = [
        { from: 'Client', to: 'Server', msg: 'SYN', desc: 'Client meminta koneksi' },
        { from: 'Server', to: 'Client', msg: 'SYN-ACK', desc: 'Server setuju dan konfirmasi' },
        { from: 'Client', to: 'Server', msg: 'ACK', desc: 'Client konfirmasi → KONEKSI TERBANGUN' },
        { from: 'Both', to: 'Both', msg: 'DATA', desc: 'Pertukaran data dimulai' }
    ];
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'handshake-step';
            stepDiv.style.cssText = `
                padding: 1rem;
                margin: 0.5rem 0;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border-radius: 8px;
                animation: slideIn 0.5s ease;
            `;
            stepDiv.innerHTML = `
                <strong>${step.from} → ${step.to}:</strong> ${step.msg}<br>
                <small>${step.desc}</small>
            `;
            container.appendChild(stepDiv);
        }, index * 1500);
    });
}

// Encoding Visualization
function drawEncoding() {
    const canvas = document.getElementById('encodingCanvas');
    const ctx = canvas.getContext('2d');
    const bits = document.getElementById('bitInput').value;
    const encoding = document.querySelector('input[name="encoding"]:checked').value;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const bitWidth = canvas.width / bits.length;
    const centerY = canvas.height / 2;
    const amplitude = 100;
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    if (encoding === 'nrz') {
        drawNRZ(ctx, bits, bitWidth, centerY, amplitude);
    } else if (encoding === 'manchester') {
        drawManchester(ctx, bits, bitWidth, centerY, amplitude);
    } else if (encoding === '4b5b') {
        draw4B5B(ctx, bits, bitWidth, centerY, amplitude);
    }
    
    ctx.stroke();
    
    // Draw bit labels
    ctx.fillStyle = '#333';
    ctx.font = '14px Inter';
    for (let i = 0; i < bits.length; i++) {
        ctx.fillText(bits[i], i * bitWidth + bitWidth/2 - 5, canvas.height - 20);
    }
}

function drawNRZ(ctx, bits, bitWidth, centerY, amplitude) {
    ctx.moveTo(0, bits[0] === '1' ? centerY - amplitude : centerY + amplitude);
    
    for (let i = 0; i < bits.length; i++) {
        const x = i * bitWidth;
        const y = bits[i] === '1' ? centerY - amplitude : centerY + amplitude;
        
        ctx.lineTo(x, y);
        if (i < bits.length - 1) {
            ctx.lineTo((i + 1) * bitWidth, y);
        }
    }
}

function drawManchester(ctx, bits, bitWidth, centerY, amplitude) {
    for (let i = 0; i < bits.length; i++) {
        const x = i * bitWidth;
        
        if (bits[i] === '1') {
            // High to Low
            ctx.moveTo(x, centerY - amplitude);
            ctx.lineTo(x + bitWidth/2, centerY - amplitude);
            ctx.lineTo(x + bitWidth/2, centerY + amplitude);
            ctx.lineTo((i + 1) * bitWidth, centerY + amplitude);
        } else {
            // Low to High
            ctx.moveTo(x, centerY + amplitude);
            ctx.lineTo(x + bitWidth/2, centerY + amplitude);
            ctx.lineTo(x + bitWidth/2, centerY - amplitude);
            ctx.lineTo((i + 1) * bitWidth, centerY - amplitude);
        }
    }
}

function draw4B5B(ctx, bits, bitWidth, centerY, amplitude) {
    // Simplified 4B/5B visualization
    const encoded = bits.padEnd(5, '0'); // Simple padding for demo
    drawNRZ(ctx, encoded, bitWidth * 0.8, centerY, amplitude);
}

// Topology Display
function showTopology(type) {
    const display = document.getElementById('topologyDisplay');
    
    const topologies = {
        star: `
            <div style="text-align: center; padding: 2rem;">
                <div style="display: inline-block; width: 100px; height: 100px; background: #667eea; border-radius: 50%; line-height: 100px; color: white; font-weight: bold;">
                    SWITCH
                </div>
                <div style="margin-top: 2rem;">
                    ${[1,2,3,4].map(i => `
                        <div style="display: inline-block; margin: 1rem; padding: 1rem; background: #27ae60; color: white; border-radius: 8px;">
                            PC ${i}
                        </div>
                    `).join('')}
                </div>
                <p style="margin-top: 1rem; color: #666;">Semua PC terhubung ke Switch pusat</p>
            </div>
        `,
        bus: `
            <div style="padding: 2rem;">
                <div style="height: 10px; background: #667eea; margin: 2rem 0;"></div>
                <div style="display: flex; justify-content: space-around;">
                    ${[1,2,3,4].map(i => `
                        <div style="padding: 1rem; background: #27ae60; color: white; border-radius: 8px;">
                            PC ${i}
                        </div>
                    `).join('')}
                </div>
                <p style="margin-top: 1rem; color: #666;">Semua PC berbagi satu kabel utama</p>
            </div>
        `,
        ring: `
            <div style="text-align: center; padding: 2rem;">
                <div style="width: 300px; height: 300px; border: 5px solid #667eea; border-radius: 50%; margin: 0 auto; position: relative;">
                    ${[0, 90, 180, 270].map((deg, i) => `
                        <div style="position: absolute; padding: 1rem; background: #27ae60; color: white; border-radius: 8px; transform: rotate(${deg}deg) translate(120px) rotate(-${deg}deg);">
                            PC ${i+1}
                        </div>
                    `).join('')}
                </div>
                <p style="margin-top: 1rem; color: #666;">Data mengalir searah dalam lingkaran</p>
            </div>
        `,
        mesh: `
            <div style="padding: 2rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    ${[1,2,3,4].map(i => `
                        <div style="padding: 1rem; background: #27ae60; color: white; border-radius: 8px; text-align: center;">
                            PC ${i}
                        </div>
                    `).join('')}
                </div>
                <p style="margin-top: 1rem; color: #666;">Setiap PC terhubung ke semua PC lain</p>
            </div>
        `
    };
    
    display.innerHTML = topologies[type] || topologies.star;
}

// Praktikum Content
const praktikumData = {
    1: {
        title: "Praktikum 1: Komunikasi Data dan Jaringan",
        content: `
            <h3>Tujuan:</h3>
            <ul>
                <li>Memahami konsep dasar komunikasi data</li>
                <li>Mengidentifikasi komponen jaringan</li>
                <li>Melakukan troubleshooting dasar</li>
            </ul>
            
            <h3>Langkah Kerja:</h3>
            <ol>
                <li>Konfigurasi IP Address manual</li>
                <li>Testing konektivitas dengan ping</li>
                <li>Packet sniffing dengan Wireshark</li>
                <li>Analisis hasil capture</li>
            </ol>
            
            <div class="code-block">
                <pre>ping 192.168.1.11
tracert 192.168.1.11
ipconfig /all</pre>
            </div>
        `
    },
    2: {
        title: "Praktikum 2: Dasar Jaringan Komputer",
        content: `
            <h3>Tools: Cisco Packet Tracer</h3>
            <ol>
                <li>Buat topologi star dengan 5 PC</li>
                <li>Konfigurasi router dasar</li>
                <li>Testing konektivitas</li>
                <li>Implementasi DHCP</li>
            </ol>
        `
    },
    3: {
        title: "Praktikum 3: Arsitektur Protokol",
        content: `
            <h3>Analisis Protokol dengan Wireshark</h3>
            <ol>
                <li>Capture traffic HTTP</li>
                <li>Analisis TCP handshake</li>
                <li>Identifikasi layer OSI</li>
                <li>Follow TCP stream</li>
            </ol>
        `
    },
    4: {
        title: "Praktikum 4: UDP dan TCP",
        content: `
            <h3>Perbandingan Protokol</h3>
            <ol>
                <li>Capture DNS query (UDP)</li>
                <li>Capture HTTP request (TCP)</li>
                <li>Bandingkan handshake</li>
                <li>Analisis overhead</li>
            </ol>
        `
    },
    5: {
        title: "Praktikum 5: Pengkodean Sinyal",
        content: `
            <h3>Visualisasi Encoding</h3>
            <ol>
                <li>Jalankan Python script</li>
                <li>Input bit pattern</li>
                <li>Visualisasi NRZ dan Manchester</li>
                <li>Analisis bandwidth</li>
            </ol>
        `
    }
};

function showPraktikum(num) {
    const content = document.getElementById('praktikumContent');
    const data = praktikumData[num];
    
    content.innerHTML = `
        <h3>${data.title}</h3>
        ${data.content}
    `;
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index + 1 === num);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showPraktikum(1);
    showTopology('star');
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    .encap-step, .handshake-step {
        animation: fadeIn 0.5s ease;
    }
`;
document.head.appendChild(style);