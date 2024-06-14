from .models import Step, Option, Evidence

MOCK_SUMMARY = """
The patient, Mickey Mouse, presented with persistent lower back pain following a motor vehicle accident. Despite conservative management including NSAIDs, muscle relaxants, and physical therapy, the pain has not significantly improved. The medical records suggest that the pain has been present for more than 3 months and there are no acute neurologic deficits. Imaging did not provide a diagnostic explanation for the pain. The plan suggests a Medial Branch Block (MBB) as the next step in the diagnostic process. Based on the evidence, the patient appears to meet the criteria for a \"Diagnostic facet joint injection\" rather than a \"Therapeutic facet joint injection.\" The patient has also met the treatment criteria for NSAIDs and physical therapy or home exercise within the last year. However, the procedure, a facet joint injection, is not justified at this point as the patient has not yet undergone any diagnostic medial branch blocks or intra-articular zygapophysial joint injections. The next appropriate step would be to proceed with the diagnostic facet joint injection (MBB) as planned to confirm the diagnosis before considering therapeutic interventions.
"""

MOCK_STEPS = [
    Step(
        key="0",
        question="Choose one of the following options and continue to the appropriate section",
        options=[
            Option(key="10", text="Diagnostic facet joint injection", selected=True),
            Option(key="20", text="Therapeutic facet joint injection", selected=False),
        ],
        reasoning='Based on the provided medical record, we need to determine whether the patient requires a diagnostic facet joint injection or a therapeutic facet joint injection. Let\'s analyze the information step by step:\n\n1. Initial Encounter: The patient, Mickey Mouse, was involved in a motor vehicle accident and reported lumbar pain. The lumbar spine X-ray showed no evidence of acute traumatic injury or significant pathology, only mild age-related changes. The diagnosis was suspected lumbar strain with possible nerve root irritation secondary to the motor vehicle accident. Conservative management with NSAIDs and muscle relaxants was prescribed, along with rest, heat/cold therapy, and a referral to physical therapy.\n\n2. Follow-Up Encounter: The patient continued to experience persistent lower back pain that has not significantly improved despite conservative management, including NSAIDs, muscle relaxants, and weeks of physical therapy. The physical examination during the follow-up revealed tenderness to palpation in the lower spine over facet joints and a slight limited range of motion due to discomfort. The assessment noted chronic lower back pain, possibly related to facet joint pathology, unresponsive to conservative treatment.\n\n3. Plan: The plan suggests trying a medial branch block (MBB) to pinpoint pain-causing nerves, which involves an anesthetic injection near key nerves. If the MBB helps, the provider is considering radiofrequency ablation (RFA) for longer relief.\n\nGiven this information, the patient has persistent symptoms despite conservative treatment, and the provider is considering further diagnostic procedures (MBB) to identify the source of pain. Since the MBB is a diagnostic procedure to confirm whether the facet joints are the source of pain, and there is no mention of prior diagnostic injections, it seems that the patient has not yet had a diagnostic facet joint injection.\n\nTherefore, based on the balance of evidence, the patient appears to meet the criteria for a "Diagnostic facet joint injection" rather than a "Therapeutic facet joint injection," as the therapeutic approach would typically follow a confirmed diagnosis of facet joint pain, which has not yet been established in this case. The next appropriate step would be to proceed with the diagnostic facet joint injection (MBB) as planned to confirm the diagnosis before considering therapeutic interventions such as RFA.',
        decision="10",
        next_step="10",
        is_met=True,
        is_final=False,
        evidence=[
            Evidence(
                content="Plan: MBB: Suggest trying Medial Branch Block (MBB) to pinpoint pain-causing nerves. This procedure involves an anesthetic injection near key nerves. Risks will be explained.",
                page_number=5,
                pdf_name="medical-record.pdf",
                event_datetime="2023-04-21T00:00:00",
            ),
            Evidence(
                content="Assessment: Chronic lower back pain, possibly related to facet joint pathology, unresponsive to conservative treatment.",
                page_number=4,
                pdf_name="medical-record.pdf",
                event_datetime="2023-04-21T00:00:00",
            ),
        ],
    ),
    Step(
        key="1",
        question="Choose one of the following options and continue to the appropriate section",
        options=[
            Option(key="10", text="Diagnostic facet joint injection", selected=True),
            Option(key="20", text="Therapeutic facet joint injection", selected=False),
        ],
        reasoning='Based on the provided medical record, we need to determine whether the patient requires a diagnostic facet joint injection or a therapeutic facet joint injection. Let\'s analyze the information step by step:\n\n1. Initial Encounter: The patient, Mickey Mouse, was involved in a motor vehicle accident and reported lumbar pain. The lumbar spine X-ray showed no evidence of acute traumatic injury or significant pathology, only mild age-related changes. The diagnosis was suspected lumbar strain with possible nerve root irritation secondary to the motor vehicle accident. Conservative management with NSAIDs and muscle relaxants was prescribed, along with rest, heat/cold therapy, and a referral to physical therapy.\n\n2. Follow-Up Encounter: The patient continued to experience persistent lower back pain that has not significantly improved despite conservative management, including NSAIDs, muscle relaxants, and weeks of physical therapy. The physical examination during the follow-up revealed tenderness to palpation in the lower spine over facet joints and a slight limited range of motion due to discomfort. The assessment noted chronic lower back pain, possibly related to facet joint pathology, unresponsive to conservative treatment.\n\n3. Plan: The plan suggests trying a medial branch block (MBB) to pinpoint pain-causing nerves, which involves an anesthetic injection near key nerves. If the MBB helps, the provider is considering radiofrequency ablation (RFA) for longer relief.\n\nGiven this information, the patient has persistent symptoms despite conservative treatment, and the provider is considering further diagnostic procedures (MBB) to identify the source of pain. Since the MBB is a diagnostic procedure to confirm whether the facet joints are the source of pain, and there is no mention of prior diagnostic injections, it seems that the patient has not yet had a diagnostic facet joint injection.\n\nTherefore, based on the balance of evidence, the patient appears to meet the criteria for a "Diagnostic facet joint injection" rather than a "Therapeutic facet joint injection," as the therapeutic approach would typically follow a confirmed diagnosis of facet joint pain, which has not yet been established in this case. The next appropriate step would be to proceed with the diagnostic facet joint injection (MBB) as planned to confirm the diagnosis before considering therapeutic interventions such as RFA.',
        decision="10",
        next_step="10",
        is_met=False,
        is_final=False,
        evidence=[
            Evidence(
                content="Plan: MBB: Suggest trying Medial Branch Block (MBB) to pinpoint pain-causing nerves. This procedure involves an anesthetic injection near key nerves. Risks will be explained.",
                page_number=5,
                pdf_name="medical-record.pdf",
                event_datetime="2023-04-21T00:00:00",
            ),
            Evidence(
                content="Assessment: Chronic lower back pain, possibly related to facet joint pathology, unresponsive to conservative treatment.",
                page_number=4,
                pdf_name="medical-record.pdf",
                event_datetime="2023-04-21T00:00:00",
            ),
        ],
    ),
    Step(
        key="2",
        question="Choose one of the following options and continue to the appropriate section",
        options=[
            Option(key="10", text="Diagnostic facet joint injection", selected=True),
            Option(key="20", text="Therapeutic facet joint injection", selected=False),
        ],
        reasoning='Based on the provided medical record, we need to determine whether the patient requires a diagnostic facet joint injection or a therapeutic facet joint injection. Let\'s analyze the information step by step:\n\n1. Initial Encounter: The patient, Mickey Mouse, was involved in a motor vehicle accident and reported lumbar pain. The lumbar spine X-ray showed no evidence of acute traumatic injury or significant pathology, only mild age-related changes. The diagnosis was suspected lumbar strain with possible nerve root irritation secondary to the motor vehicle accident. Conservative management with NSAIDs and muscle relaxants was prescribed, along with rest, heat/cold therapy, and a referral to physical therapy.\n\n2. Follow-Up Encounter: The patient continued to experience persistent lower back pain that has not significantly improved despite conservative management, including NSAIDs, muscle relaxants, and weeks of physical therapy. The physical examination during the follow-up revealed tenderness to palpation in the lower spine over facet joints and a slight limited range of motion due to discomfort. The assessment noted chronic lower back pain, possibly related to facet joint pathology, unresponsive to conservative treatment.\n\n3. Plan: The plan suggests trying a medial branch block (MBB) to pinpoint pain-causing nerves, which involves an anesthetic injection near key nerves. If the MBB helps, the provider is considering radiofrequency ablation (RFA) for longer relief.\n\nGiven this information, the patient has persistent symptoms despite conservative treatment, and the provider is considering further diagnostic procedures (MBB) to identify the source of pain. Since the MBB is a diagnostic procedure to confirm whether the facet joints are the source of pain, and there is no mention of prior diagnostic injections, it seems that the patient has not yet had a diagnostic facet joint injection.\n\nTherefore, based on the balance of evidence, the patient appears to meet the criteria for a "Diagnostic facet joint injection" rather than a "Therapeutic facet joint injection," as the therapeutic approach would typically follow a confirmed diagnosis of facet joint pain, which has not yet been established in this case. The next appropriate step would be to proceed with the diagnostic facet joint injection (MBB) as planned to confirm the diagnosis before considering therapeutic interventions such as RFA.',
        decision="10",
        next_step="10",
        is_met=True,
        is_final=False,
        evidence=[
            Evidence(
                content="Plan: MBB: Suggest trying Medial Branch Block (MBB) to pinpoint pain-causing nerves. This procedure involves an anesthetic injection near key nerves. Risks will be explained.",
                page_number=5,
                pdf_name="medical-record.pdf",
                event_datetime="2023-04-21T00:00:00",
            ),
            Evidence(
                content="Assessment: Chronic lower back pain, possibly related to facet joint pathology, unresponsive to conservative treatment.",
                page_number=4,
                pdf_name="medical-record.pdf",
                event_datetime="2023-04-21T00:00:00",
            ),
        ],
    ),
]
